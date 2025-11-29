// scripts/generateHadithData.js
const fs = require('fs');
const path = require('path');

// Read existing data
const booksData = require('../data/books.json');
const chaptersData = require('../data/chapters.json');
const categoriesData = require('../data/categories.json');
const hadithsData = require('../data/hadiths.json');

// Sample hadith templates with all languages
const hadithTemplates = [
  {
    template: "عن {narrator} رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: \"{text}\"",
    translations: {
      en: "Narrated {narrator}: The Messenger of Allah (ﷺ) said, \"{text}\"",
      vi: "Thuật lại từ {narrator}: Sứ giả của Allah (ﷺ) nói, \"{text}\"",
      bn: "{narrator} থেকে বর্ণিত। তিনি বলেন, রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন: \"{text}\"",
      ur: "حضرت {narrator} رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: \"{text}\"",
      tr: "{narrator}'den rivayet edildiğine göre: Allah'ın Elçisi (ﷺ) şöyle buyurdu: \"{text}\"",
      fr: "D'après {narrator} : Le Messager d'Allah (ﷺ) a dit : \"{text}\"",
      es: "Narrado por {narrator}: El Mensajero de Allah (ﷺ) dijo: \"{text}\"",
      id: "Diriwayatkan dari {narrator}: Rasulullah (ﷺ) bersabda, \"{text}\"",
      ms: "Diriwayatkan dari {narrator}: Rasulullah (ﷺ) bersabda, \"{text}\"",
      bs: "Prenosi se od {narrator}: Allahov Poslanik (ﷺ) je rekao: \"{text}\"",
      ru: "Сообщается, что {narrator} сказал: \"Посланник Аллаха (ﷺ) сказал: \"{text}\"",
      fa: "از {narrator} روایت است که رسول خدا (ﷺ) فرمود: \"{text}\"",
      hi: "{narrator} से वर्णित है: अल्लाह के रसूल (ﷺ) ने कहा, \"{text}\"",
      si: "{narrator} විසින් කියනු ලැබේ: අල්ලාහ්ගේ දූතයාණන් (ﷺ) වහන්සේ මෙසේ වදාළේය: \"{text}\"",
      tl: "Isinalaysay ni {narrator}: Ang Sugo ng Allah (ﷺ) ay nagsabi, \"{text}\"",
      zh: "由{narrator}传述：安拉的使者（ﷺ）说：\"{text}\""
    }
  }
];

const narrators = [
  { en: "Abu Huraira", vi: "Abu Huraira", bn: "আবু হুরায়রা", ur: "ابو ہریرہ", tr: "Ebu Hureyre", fr: "Abou Hourayra", es: "Abu Huraira", id: "Abu Huraira", ms: "Abu Hurairah", bs: "Ebu Hurejre", ru: "Абу Хурайра", fa: "ابوهریره", hi: "अबू हुरैरा", si: "අබු හුරයිරා", tl: "Abu Huraira", zh: "艾布·胡莱赖" },
  { en: "Umar bin Al-Khattab", vi: "Umar bin Al-Khattab", bn: "উমর ইবনুল খাত্তাব", ur: "عمر بن خطاب", tr: "Ömer bin El-Hattab", fr: "Omar ibn Al-Khattab", es: "Umar bin Al-Jattab", id: "Umar bin Al-Khattab", ms: "Umar bin Al-Khattab", bs: "Omar bin Al-Hattab", ru: "Умар ибн аль-Хаттаб", fa: "عمر بن خطاب", hi: "उमर बिन अल-खत्ताब", si: "උමර් බින් අල්-ඛත්තාබ්", tl: "Umar bin Al-Khattab", zh: "欧麦尔·本·哈塔卜" },
  { en: "Aisha", vi: "Aisha", bn: "আয়েশা", ur: "عائشہ", tr: "Aişe", fr: "Aïcha", es: "Aisha", id: "Aisyah", ms: "Aisyah", bs: "Aiša", ru: "Аиша", fa: "عایشه", hi: "आयशा", si: "ආයිෂා", tl: "Aisha", zh: "阿伊莎" }
];

const hadithTexts = [
  {
    text: "إنما الأعمال بالنيات",
    translations: {
      en: "Actions are but by intentions",
      vi: "Hành động chỉ được đánh giá bằng ý định",
      bn: "কর্মগুলি কেবলমাত্র নিয়ত দ্বারা",
      ur: "اعمال کا دارومدار نیتوں پر ہے",
      tr: "Ameller ancak niyetlere göredir",
      fr: "Les actions ne valent que par les intentions",
      es: "Las acciones solo valen por las intenciones",
      id: "Sesungguhnya amal perbuatan itu tergantung pada niatnya",
      ms: "Sesungguhnya setiap amalan itu bergantung pada niat",
      bs: "Djela su samo prema namjerama",
      ru: "Поистине, дела оцениваются только по намерениям",
      fa: "بی‌گمان اعمال به نیت‌ها بستگی دارد",
      hi: "बेशक कर्मों का आधार इरादे हैं",
      si: "නියත වශයෙන්ම ක්‍රියා අභිප්‍රායන් මත රඳා පවතී",
      tl: "Ang mga gawa ay ayon sa mga intensyon",
      zh: "行为只凭举意"
    }
  },
  {
    text: "طلب العلم فريضة على كل مسلم",
    translations: {
      en: "Seeking knowledge is obligatory upon every Muslim",
      vi: "Tìm kiếm kiến thức là bắt buộc đối với mọi Muslim",
      bn: "প্রত্যেক মুসলিমের উপর জ্ঞান অর্জন করা ফরজ",
      ur: "ہر مسلمان پر علم حاصل کرنا فرض ہے",
      tr: "İlim talep etmek her Müslüman'a farzdır",
      fr: "La recherche de la connaissance est une obligation pour tout musulman",
      es: "Buscar conocimiento es obligatorio para todo musulmán",
      id: "Menuntut ilmu wajib bagi setiap Muslim",
      ms: "Menuntut ilmu wajib ke atas setiap Muslim",
      bs: "Traženje znanja je obaveza za svakog muslimana",
      ru: "Стремление к знанию обязательно для каждого мусульманина",
      fa: "طلب علم بر هر مسلمانی واجب است",
      hi: "हर मुसलमान पर ज्ञान की तलाश करना अनिवार्य है",
      si: "දැනුම සෙවීම සෑම මුස්ලිම්වරයෙකුටම අනිවාර්යය",
      tl: "Ang paghahanap ng kaalaman ay obligasyon sa bawat Muslim",
      zh: "寻求知识是每个穆斯林的义务"
    }
  }
];

function generateHadiths() {
  const newHadithsData = { ...hadithsData };
  
  // Ensure categories section exists
  if (!newHadithsData.categories) {
    newHadithsData.categories = {};
  }

  // Generate hadiths for all categories
  categoriesData.forEach(category => {
    const categoryId = category.id;
    
    if (!newHadithsData.categories[categoryId]) {
      newHadithsData.categories[categoryId] = [];
      
      // Add 2-3 hadiths per category
      for (let i = 1; i <= 3; i++) {
        const template = hadithTemplates[0];
        const narrator = narrators[i % narrators.length];
        const hadithText = hadithTexts[i % hadithTexts.length];
        
        const hadithId = 10000 + (categoryId * 100) + i;
        
        const hadith = {
          id: hadithId,
          hadith_number: i,
          hadeeth: template.template
            .replace('{narrator}', narrator.ar || narrator.en)
            .replace('{text}', hadithText.text),
          translations: {},
          grade: {
            en: "Sahih", vi: "Sahih", bn: "সহীহ", ur: "صحیح", tr: "Sahih", fr: "Sahih", es: "Sahih", 
            id: "Sahih", ms: "Sahih", bs: "Sahih", ru: "Сахих", fa: "صحیح", hi: "सहीह", 
            si: "සහීහ්", tl: "Sahih", zh: "健全的"
          },
          book_id: 1,
          chapter_id: 1,
          category_id: categoryId,
          explanation: {
            en: "This hadith teaches important Islamic principles.",
            vi: "Hadith này dạy các nguyên tắc quan trọng của Islam.",
            bn: "এই হাদীসটি গুরুত্বপূর্ণ ইসলামী নীতি শেখায়।",
            ur: "یہ حدیث اہم اسلامی اصول سکھاتی ہے۔",
            tr: "Bu hadis önemli İslami prensipleri öğretir.",
            fr: "Ce hadith enseigne des principes islamiques importants.",
            es: "Este hadiz enseña importantes principios islámicos.",
            id: "Hadis ini mengajarkan prinsip-prinsip Islam yang penting.",
            ms: "Hadis ini mengajarkan prinsip-prinsip Islam yang penting.",
            bs: "Ovaj hadis uči važna islamska načela.",
            ru: "Этот хадис учит важным исламским принципам.",
            fa: "این حدیث اصول مهم اسلامی را آموزش می‌دهد.",
            hi: "यह हदीस महत्वपूर्ण इस्लामी सिद्धांतों को सिखाती है।",
            si: "මෙම හදීසය වැදගත් ඉස්ලාමීය මූලධර්ම ඉගැන්වේ.",
            tl: "Ang hadith na ito ay nagtuturo ng mahahalagang prinsipyo ng Islam.",
            zh: "这段圣训教导重要的伊斯兰原则。"
          },
          hints: {
            en: ["Practice what you learn", "Share knowledge with others"],
            vi: ["Thực hành những gì bạn học", "Chia sẻ kiến thức với người khác"],
            bn: ["আপনি যা শিখেন তা অনুশীলন করুন", "অন্যদের সাথে জ্ঞান ভাগ করুন"],
            ur: ["جو سیکھیں اس پر عمل کریں", "دوسروں کے ساتھ علم بانٹیں"],
            tr: ["Öğrendiklerinizi uygulayın", "Bilgiyi başkalarıyla paylaşın"],
            fr: ["Pratiquez ce que vous apprenez", "Partagez la connaissance avec les autres"],
            es: ["Practica lo que aprendes", "Comparte el conocimiento con otros"],
            id: ["Praktekkan apa yang Anda pelajari", "Bagikan pengetahuan dengan orang lain"],
            ms: ["Amalkan apa yang dipelajari", "Kongsi ilmu dengan orang lain"],
            bs: ["Praktikujte ono što naučite", "Podijelite znanje s drugima"],
            ru: ["Практикуйте то, что вы изучаете", "Делитесь знаниями с другими"],
            fa: ["آنچه می‌آموزید را تمرین کنید", "دانش را با دیگران به اشتراک بگذارید"],
            hi: ["जो सीखें उसे अमल में लाएं", "दूसरों के साथ ज्ञान साझा करें"],
            si: ["ඔබ ඉගෙන ගන්නා දේ ප්‍රායෝගික කරන්න", "දැනුම අන් අය සමඟ බෙදාගන්න"],
            tl: ["Isagawa ang iyong natutunan", "Ibahagi ang kaalaman sa iba"],
            zh: ["实践你所学到的", "与他人分享知识"]
          },
          references: {
            en: "Sahih al-Bukhari 1",
            vi: "Sahih al-Bukhari 1",
            bn: "সহীহ আল-বুখারী ১",
            ur: "صحیح البخاری 1",
            tr: "Sahih al-Bukhari 1",
            fr: "Sahih al-Bukhari 1",
            es: "Sahih al-Bukhari 1",
            id: "Sahih al-Bukhari 1",
            ms: "Sahih al-Bukhari 1",
            bs: "Sahih al-Bukhari 1",
            ru: "Сахих аль-Бухари 1",
            fa: "صحیح بخاری 1",
            hi: "सहीह अल-बुखारी 1",
            si: "සහීහ් අල්-බුඛාරි 1",
            tl: "Sahih al-Bukhari 1",
            zh: "布哈里圣训实录 1"
          },
          word_meanings: {
            en: "key: meaning",
            vi: "key: ý nghĩa",
            bn: "key: অর্থ",
            ur: "key: معنی",
            tr: "key: anlam",
            fr: "key: signification",
            es: "key: significado",
            id: "key: arti",
            ms: "key: maksud",
            bs: "key: značenje",
            ru: "key: значение",
            fa: "key: معنی",
            hi: "key: अर्थ",
            si: "key: අර්ථය",
            tl: "key: kahulugan",
            zh: "key: 意思"
          },
          narrator: narrator,
          created_at: "2025-10-31T06:20:24.000000Z",
          updated_at: "2025-10-31T21:44:14.000000Z"
        };

        // Generate translations for all languages
        Object.keys(template.translations).forEach(lang => {
          hadith.translations[lang] = template.translations[lang]
            .replace('{narrator}', narrator[lang] || narrator.en)
            .replace('{text}', hadithText.translations[lang] || hadithText.translations.en);
        });

        newHadithsData.categories[categoryId].push(hadith);
      }
    }
  });

  // Generate hadiths for all book chapters
  Object.keys(chaptersData).forEach(bookId => {
    if (!newHadithsData[bookId]) {
      newHadithsData[bookId] = {};
    }

    const bookChapters = chaptersData[bookId];
    bookChapters.forEach(chapter => {
      const chapterId = chapter.id;
      
      if (!newHadithsData[bookId][chapterId]) {
        newHadithsData[bookId][chapterId] = [];
        
        // Add 2-3 hadiths per chapter
        for (let i = 1; i <= 3; i++) {
          const template = hadithTemplates[0];
          const narrator = narrators[i % narrators.length];
          const hadithText = hadithTexts[i % hadithTexts.length];
          
          const hadithId = 20000 + (bookId * 1000) + (chapterId * 100) + i;
          
          const hadith = {
            id: hadithId,
            hadith_number: i,
            hadeeth: template.template
              .replace('{narrator}', narrator.ar || narrator.en)
              .replace('{text}', hadithText.text),
            translations: {},
            grade: {
              en: "Sahih", vi: "Sahih", bn: "সহীহ", ur: "صحیح", tr: "Sahih", fr: "Sahih", es: "Sahih", 
              id: "Sahih", ms: "Sahih", bs: "Sahih", ru: "Сахих", fa: "صحیح", hi: "सहीह", 
              si: "සහීහ්", tl: "Sahih", zh: "健全的"
            },
            book_id: parseInt(bookId),
            chapter_id: chapterId,
            category_id: 1, // Default category
            explanation: {
              en: "This hadith contains important guidance for Muslims.",
              vi: "Hadith này chứa hướng dẫn quan trọng cho người Hồi giáo.",
              bn: "এই হাদীসটিতে মুসলমানদের জন্য গুরুত্বপূর্ণ নির্দেশনা রয়েছে।",
              ur: "یہ حدیث مسلمانوں کے لیے اہم رہنمائی پر مشتمل ہے۔",
              tr: "Bu hadis Müslümanlar için önemli rehberlik içerir.",
              fr: "Ce hadith contient des conseils importants pour les musulmans.",
              es: "Este hadiz contiene una guía importante para los musulmanes.",
              id: "Hadis ini berisi panduan penting bagi Muslim.",
              ms: "Hadis ini mengandungi panduan penting untuk umat Islam.",
              bs: "Ovaj hadis sadrži važne smjernice za muslimane.",
              ru: "Этот хадис содержит важное руководство для мусульман.",
              fa: "این حدیث حاوی راهنمایی مهم برای مسلمانان است.",
              hi: "इस हदीस में मुसलमानों के लिए महत्वपूर्ण मार्गदर्शन है।",
              si: "මෙම හදීසය මුස්ලිම්වරුන් සඳහා වැදගත් මගපෙන්වීම් අඩංගු වේ.",
              tl: "Ang hadith na ito ay naglalaman ng mahalagang gabay para sa mga Muslim.",
              zh: "这段圣训包含对穆斯林的重要指导。"
            },
            hints: {
              en: ["Reflect on the meaning", "Apply in daily life"],
              vi: ["Suy ngẫm về ý nghĩa", "Áp dụng trong cuộc sống hàng ngày"],
              bn: ["অর্থ নিয়ে চিন্তা করুন", "দৈনন্দিন জীবনে প্রয়োগ করুন"],
              ur: ["معنی پر غور کریں", "روزمرہ زندگی میں لاگو کریں"],
              tr: ["Anlamı üzerine düşünün", "Günlük hayatta uygulayın"],
              fr: ["Réfléchissez au sens", "Appliquez dans la vie quotidienne"],
              es: ["Reflexiona sobre el significado", "Aplica en la vida diaria"],
              id: ["Renungkan maknanya", "Terapkan dalam kehidupan sehari-hari"],
              ms: ["Renungkan maknanya", "Amalkan dalam kehidupan seharian"],
              bs: ["Razmislite o značenju", "Primijenite u svakodnevnom životu"],
              ru: ["Подумайте о значении", "Применяйте в повседневной жизни"],
              fa: ["در معنی تأمل کنید", "در زندگی روزمره به کار ببرید"],
              hi: ["अर्थ पर विचार करें", "दैनिक जीवन में लागू करें"],
              si: ["අර්ථය පිළිබඳව චින්තනය කරන්න", "දෛනික ජීවිතයේ යොදා ගන්න"],
              tl: ["Pag-isipan ang kahulugan", "Ilapat sa pang-araw-araw na buhay"],
              zh: ["思考含义", "在日常生活中应用"]
            },
            references: {
              en: "Sahih Muslim 1",
              vi: "Sahih Muslim 1",
              bn: "সহীহ মুসলিম ১",
              ur: "صحیح مسلم 1",
              tr: "Sahih Muslim 1",
              fr: "Sahih Muslim 1",
              es: "Sahih Muslim 1",
              id: "Sahih Muslim 1",
              ms: "Sahih Muslim 1",
              bs: "Sahih Muslim 1",
              ru: "Сахих Муслим 1",
              fa: "صحیح مسلم 1",
              hi: "सहीह मुस्लिम 1",
              si: "සහීහ් මුස්ලිම් 1",
              tl: "Sahih Muslim 1",
              zh: "穆斯林圣训实录 1"
            },
            word_meanings: {
              en: "word: meaning",
              vi: "từ: ý nghĩa",
              bn: "শব্দ: অর্থ",
              ur: "لفظ: معنی",
              tr: "kelime: anlam",
              fr: "mot: signification",
              es: "palabra: significado",
              id: "kata: arti",
              ms: "perkataan: maksud",
              bs: "riječ: značenje",
              ru: "слово: значение",
              fa: "کلمه: معنی",
              hi: "शब्द: अर्थ",
              si: "වචනය: අර්ථය",
              tl: "salita: kahulugan",
              zh: "词: 意思"
            },
            narrator: narrator,
            created_at: "2025-10-31T06:20:24.000000Z",
            updated_at: "2025-10-31T21:44:14.000000Z"
          };

          // Generate translations for all languages
          Object.keys(template.translations).forEach(lang => {
            hadith.translations[lang] = template.translations[lang]
              .replace('{narrator}', narrator[lang] || narrator.en)
              .replace('{text}', hadithText.translations[lang] || hadithText.translations.en);
          });

          newHadithsData[bookId][chapterId].push(hadith);
        }
      }
    });
  });

  return newHadithsData;
}

// Generate and save the data
const completeHadithsData = generateHadiths();
fs.writeFileSync(
  path.join(__dirname, '../data/hadiths.json'),
  JSON.stringify(completeHadithsData, null, 2)
);

console.log('✅ Complete hadiths data generated successfully!');
console.log(`📚 Total categories with hadiths: ${Object.keys(completeHadithsData.categories).length}`);
console.log(`📖 Total books with hadiths: ${Object.keys(completeHadithsData).filter(key => key !== 'categories').length}`);