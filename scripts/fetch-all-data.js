const fs = require('fs');
const path = require('path');

console.log('🚀 Starting comprehensive hadith data generation...\n');

// Configuration
const CONFIG = {
  outputDir: path.join(__dirname, '../data'),
  languages: ['ar', 'en', 'vi', 'bn', 'ur', 'tr', 'fr', 'es', 'id', 'ms', 'bs', 'ru', 'fa', 'hi', 'si', 'tl', 'zh']
};

// Create comprehensive sample data with COMPLETE translations
function createComprehensiveSampleData() {
  console.log('📦 Generating comprehensive sample data...');
  
  const books = [
    {
      id: 1,
      code: "bukhari",
      name_en: "Sahih al-Bukhari",
      name_ar: "صحيح البخاري",
      name_vi: "Sahih al-Bukhari",
      name_bn: "সহীহ বুখারী",
      name_ur: "صحیح بخاری",
      name_tr: "Sahih-i Buhari",
      name_fr: "Sahih al-Boukhari",
      name_es: "Sahih al-Bujari",
      name_id: "Shahih al-Bukhari",
      name_ru: "Сахих аль-Бухари",
      name_zh: "布哈里圣训实录",
      title: "Sahih Bukhari",
      title_vi: "Sahih Bukhari",
      total_hadiths: 7563,
      description: "The most authentic book of Hadith",
      description_vi: "Sách Hadith đáng tin cậy nhất",
      author: "Muhammad al-Bukhari",
      author_ar: "محمد البخاري",
      years: "194-256 AH",
      status: "Sahih"
    },
    {
      id: 2,
      code: "muslim",
      name_en: "Sahih Muslim",
      name_ar: "صحيح مسلم",
      name_vi: "Sahih Muslim",
      name_bn: "সহীহ মুসলিম",
      name_ur: "صحیح مسلم",
      name_tr: "Sahih-i Müslim",
      name_fr: "Sahih Mouslim",
      name_es: "Sahih Muslim",
      name_id: "Shahih Muslim",
      name_ru: "Сахих Муслим",
      name_zh: "穆斯林圣训实录",
      title: "Sahih Muslim",
      title_vi: "Sahih Muslim",
      total_hadiths: 5362,
      description: "Second most authentic Hadith collection",
      description_vi: "Bộ sưu tập Hadith đáng tin cậy thứ hai",
      author: "Muslim ibn al-Hajjaj",
      author_ar: "مسلم بن الحجاج",
      years: "206-261 AH",
      status: "Sahih"
    }
  ];

  // ALL CATEGORIES
  const categories = [
    {
      id: 1,
      name_en: "The Noble Qur'an and Qur'anic Sciences",
      name_ar: "القرآن الكريم وعلومه",
      name_vi: "Kinh Qur'an Cao Quý và Khoa học Qur'an",
      name_bn: "মহিমান্বিত কুরআন ও কুরআনিক বিজ্ঞান",
      name_ur: "قرآن مجید اور قرآنی علوم",
      parent_id: null,
      hadiths_count: 81,
      order: 1
    },
    {
      id: 2,
      name_en: "The Hadith and Hadith Sciences",
      name_ar: "الحديث وعلومه",
      name_vi: "Hadith và Khoa học Hadith",
      name_bn: "হাদীস ও হাদীস বিজ্ঞান",
      name_ur: "حدیث اور حدیث کے علوم",
      parent_id: null,
      hadiths_count: 9,
      order: 2
    },
    {
      id: 3,
      name_en: "The Creed",
      name_ar: "العقيدة",
      name_vi: "Tín Ngưỡng",
      name_bn: "আকীদাহ",
      name_ur: "عقیدہ",
      parent_id: null,
      hadiths_count: 457,
      order: 3
    },
    {
      id: 8,
      name_en: "Revelation and Collection of the Qur'an",
      name_ar: "الوحي وجمع القرآن",
      name_vi: "Mặc khải và Sưu tập Qur'an",
      name_bn: "ওহী ও কুরআন সংকলন",
      name_ur: "وحی اور قرآن کا جمع ہونا",
      parent_id: 1,
      hadiths_count: 15,
      order: 1
    },
    {
      id: 9,
      name_en: "Modes of Qur'anic Recitation and Tajweed",
      name_ar: "قراءات القرآن والتجويد",
      name_vi: "Cách đọc Qur'an và Quy tắc Tajweed",
      name_bn: "কুরআন তিলাওয়াতের পদ্ধতি ও তাজবীদ",
      name_ur: "قرآن کی قراءتیں اور تجوید",
      parent_id: 1,
      hadiths_count: 8,
      order: 2
    },
    {
      id: 13,
      name_en: "Faith (Iman)",
      name_ar: "الإيمان",
      name_vi: "Đức tin (Iman)",
      name_bn: "ঈমান",
      name_ur: "ایمان",
      parent_id: 3,
      hadiths_count: 156,
      order: 1
    },
    {
      id: 14,
      name_en: "Monotheism (Tawhid)",
      name_ar: "التوحيد",
      name_vi: "Thuyết nhất thần (Tawhid)",
      name_bn: "তাওহীদ",
      name_ur: "توحید",
      parent_id: 3,
      hadiths_count: 89,
      order: 2
    }
  ];

  // COMPREHENSIVE CHAPTERS FOR EACH BOOK
  const chapters = {};
  
  books.forEach(book => {
    chapters[book.id] = [];
    
    const chapterTitles = book.id === 1 ? [
      "Revelation", "Belief", "Knowledge", "Ablution (Wudu)", "Bathing (Ghusl)",
      "Menstrual Periods", "Tayammum (Dry Ablution)", "Prayer (Salah)", 
      "Times of Prayers", "Call to Prayer (Adhan)"
    ] : [
      "Faith", "Purification", "Prayer", "Mosques and Places of Prayer", 
      "Prayer of Travelers", "Funeral Prayers", "Zakat", "Fasting", "Itikaf", "Hajj"
    ];
    
    // Create chapters with proper names
    chapterTitles.forEach((title, index) => {
      const chapterId = index + 1;
      chapters[book.id].push({
        id: chapterId,
        chapter_title: title,
        name_en: title,
        name_ar: getArabicChapterTitle(title),
        name_vi: getVietnameseChapterTitle(title),
        name_bn: getBengaliChapterTitle(title),
        name_ur: getUrduChapterTitle(title),
        book_id: book.id,
        hadith_count: 10,
        order: chapterId
      });
    });
  });

  // Helper functions for chapter titles
  function getArabicChapterTitle(englishTitle) {
    const titles = {
      "Revelation": "الوحي", "Belief": "الإيمان", "Knowledge": "العلم", 
      "Ablution (Wudu)": "الوضوء", "Bathing (Ghusl)": "الغسل", "Prayer (Salah)": "الصلاة",
      "Faith": "الإيمان", "Purification": "الطهارة", "Zakat": "الزكاة", "Fasting": "الصيام"
    };
    return titles[englishTitle] || `الباب ${englishTitle}`;
  }

  function getVietnameseChapterTitle(englishTitle) {
    const titles = {
      "Revelation": "Mặc khải", "Belief": "Đức tin", "Knowledge": "Kiến thức", 
      "Ablution (Wudu)": "Rửa tay chân (Wudu)", "Bathing (Ghusl)": "Tắm (Ghusl)", 
      "Prayer (Salah)": "Lễ nguyện (Salah)", "Faith": "Đức tin", "Purification": "Thanh tẩy"
    };
    return titles[englishTitle] || `Chương ${englishTitle}`;
  }

  function getBengaliChapterTitle(englishTitle) {
    const titles = {
      "Revelation": "وحي", "Belief": "إيمان", "Knowledge": "علم", 
      "Ablution (Wudu)": "وضوء", "Bathing (Ghusl)": "غسل", "Prayer (Salah)": "صلاة",
      "Faith": "إيمان", "Purification": "طهارة"
    };
    return titles[englishTitle] || `باب ${englishTitle}`;
  }

  function getUrduChapterTitle(englishTitle) {
    const titles = {
      "Revelation": "وحی", "Belief": "ایمان", "Knowledge": "علم", 
      "Ablution (Wudu)": "وضو", "Bathing (Ghusl)": "غسل", "Prayer (Salah)": "نماز",
      "Faith": "ایمان", "Purification": "طہارت"
    };
    return titles[englishTitle] || `باب ${englishTitle}`;
  }

  // Generate COMPLETE hadiths for each chapter in each book
  const hadiths = {};
  
  books.forEach(book => {
    hadiths[book.id] = {};
    chapters[book.id].forEach(chapter => {
      hadiths[book.id][chapter.id] = [];
      
      // Create 8 hadiths per chapter
      const hadithCount = 8;
      for (let i = 1; i <= hadithCount; i++) {
        const hadithId = parseInt(`${book.id}${chapter.id}${i}`);
        
        // Create COMPLETE hadith with ALL translations
        const completeHadith = {
          id: hadithId,
          hadith_number: i,
          hadeeth: `بسم الله الرحمن الرحيم. حدثنا عبد الله بن يوسف قال: أخبرنا مالك عن ابن شهاب عن محمد بن جبير بن مطعم عن أبيه قال: سمعت رسول الله صلى الله عليه وسلم قرأ في المغرب بالطور. [${book.id}.${chapter.id}.${i}]`,
          arabic_text: `بسم الله الرحمن الرحيم. حدثنا عبد الله بن يوسف قال: أخبرنا مالك عن ابن شهاب عن محمد بن جبير بن مطعم عن أبيه قال: سمعت رسول الله صلى الله عليه وسلم قرأ في المغرب بالطور. [${book.id}.${chapter.id}.${i}]`,
          translations: generateCompleteTranslationsForAllLanguages(book.id, chapter.id, i, chapter.name_en),
          grade: generateGrade(),
          explanation: generateExplanation(book.id, chapter.id, i),
          hints: generateHints(book.id, chapter.id, i),
          references: generateReferences(book.id, chapter.id, i),
          word_meanings: generateWordMeanings(book.id, chapter.id, i),
          narrator: generateNarrator(book.id, chapter.id, i),
          book: {
            id: book.id,
            name_en: book.name_en,
            name_ar: book.name_ar
          },
          chapter: {
            id: chapter.id,
            name_en: chapter.name_en,
            name_ar: chapter.name_ar
          },
          book_id: book.id,
          chapter_id: chapter.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        hadiths[book.id][chapter.id].push(completeHadith);
      }
    });
  });

  // Generate COMPLETE translations for ALL 17 languages
  function generateCompleteTranslationsForAllLanguages(bookId, chapterId, hadithNumber, chapterName) {
    const bookNames = {
      1: {
        en: "Sahih al-Bukhari", vi: "Sahih al-Bukhari", bn: "সহীহ বুখারী", 
        ar: "صحيح البخاري", ur: "صحیح بخاری", tr: "Sahih-i Buhari", 
        fr: "Sahih al-Boukhari", es: "Sahih al-Bujari", id: "Shahih al-Bukhari",
        ms: "Sahih al-Bukhari", bs: "Sahih al-Buhari", ru: "Сахих аль-Бухари", 
        fa: "صحیح بخاری", hi: "सहीह अल-बुखारी", si: "සහීහ් අල්-බුඛාරි", 
        tl: "Sahih al-Bukhari", zh: "布哈里圣训实录"
      },
      2: {
        en: "Sahih Muslim", vi: "Sahih Muslim", bn: "সহীহ মুসলিম",
        ar: "صحيح مسلم", ur: "صحیح مسلم", tr: "Sahih-i Müslim",
        fr: "Sahih Mouslim", es: "Sahih Muslim", id: "Shahih Muslim", 
        ms: "Sahih Muslim", bs: "Sahih Muslim", ru: "Сахих Муслим", 
        fa: "صحیح مسلم", hi: "सहीह मुस्लिम", si: "සහීහ් මුස්ලිම්", 
        tl: "Sahih Muslim", zh: "穆斯林圣训实录"
      }
    };
    
    const bookName = bookNames[bookId] || bookNames[1];
    
    // Different hadith texts for variety
    const hadithTexts = [
      {
        en: `Narrated Jabir bin Abdullah: The Prophet (ﷺ) said, "The example of a believer who recites the Qur'an is that of a citron which tastes good and smells good. And the example of a believer who does not recite the Qur'an is that of a date which tastes good but has no smell. And the example of a hypocrite who recites the Qur'an is that of a fragrant flower which smells good but tastes bitter. And the example of a hypocrite who does not recite the Qur'an is that of a colocynth (bitter apple) which tastes bitter and has no smell." [${bookName.en} ${hadithNumber}]`,
        vi: `Thuật lại từ Jabir bin Abdullah: Nhà tiên tri (ﷺ) nói, "Ví dụ về một tín đồ đọc Qur'an giống như một quả thanh yên có vị ngon và mùi thơm. Và ví dụ về một tín đồ không đọc Qur'an giống như một quả chà là có vị ngon nhưng không có mùi thơm. Và ví dụ về một kẻ đạo đức giả đọc Qur'an giống như một bông hoa thơm có mùi thơm nhưng vị đắng. Và ví dụ về một kẻ đạo đức giả không đọc Qur'an giống như một quả colocynth (táo đắng) có vị đắng và không có mùi thơm." [${bookName.vi} ${hadithNumber}]`,
        bn: `জাবির বিন আবদুল্লাহ থেকে বর্ণিত: নবী (ﷺ) বলেছেন, "যে মুমিন কুরআন তিলাওয়াত করে তার উদাহরণ হলো একটি লেবুর মতো যার স্বাদ ভালো এবং গন্ধ ভালো। এবং যে মুমিন কুরআন তিলাওয়াত করে না তার উদাহরণ হলো একটি খেজুরের মতো যার স্বাদ ভালো কিন্তু কোন গন্ধ নেই। এবং যে মুনাফিক কুরআন তিলাওয়াত করে তার উদাহরণ হলো একটি সুগন্ধি ফুলের মতো যার গন্ধ ভালো কিন্তু স্বাদ তিক্ত। এবং যে মুনাফিক কুরআন তিলাওয়াত করে না তার উদাহরণ হলো একটি করল্লার (তিক্ত আপেল) মতো যার স্বাদ তিক্ত এবং কোন গন্ধ নেই।" [${bookName.bn} ${hadithNumber}]`,
        ar: `عن جابر بن عبد الله قال: قال رسول الله صلى الله عليه وسلم: "مثل المؤمن الذي يقرأ القرآن مثل الأترجة طعمها طيب وريحها طيب، ومثل المؤمن الذي لا يقرأ القرآن مثل التمرة طعمها طيب ولا ريح لها، ومثل المنافق الذي يقرأ القرآن مثل الريحانة ريحها طيب وطعمها مر، ومثل المنافق الذي لا يقرأ القرآن مثل الحنظلة طعمها مر ولا ريح لها." [${bookName.ar} ${hadithNumber}]`,
        ur: `حضرت جابر بن عبداللہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: "اس مومن کی مثال جو قرآن پڑھتا ہے ترنج کے پھل کی سی ہے جس کا ذائقہ اچھا ہے اور خوشبو اچھی ہے۔ اور اس مومن کی مثال جو قرآن نہیں پڑھتا ہے کھجور کی سی ہے جس کا ذائقہ اچھا ہے لیکن اس میں خوشبو نہیں ہے۔ اور اس منافق کی مثال جو قرآن پڑھتا ہے خوشبودار پھول کی سی ہے جس کی خوشبو اچھی ہے لیکن ذائقہ کڑوا ہے۔ اور اس منافق کی مثال جو قرآن نہیں پڑھتا ہے حنظلے (کڑوا سیب) کی سی ہے جس کا ذائقہ کڑوا ہے اور اس میں خوشبو নہیں ہے۔" [${bookName.ur} ${hadithNumber}]`,
        tr: `Cabir bin Abdullah'tan rivayet edildiğine göre: Peygamber (ﷺ) şöyle buyurdu: "Kur'an okuyan müminin misali, tadı güzel ve kokusu güzel olan turunç gibidir. Kur'an okumayan müminin misali, tadı güzel ama kokusu olmayan hurma gibidir. Kur'an okuyan münafığın misali, kokusu güzel ama tadı acı olan güzel kokulu bir çiçek gibidir. Kur'an okumayan münafığın misali, tadı acı ve kokusu olmayan hanzal (acı elma) gibidir." [${bookName.tr} ${hadithNumber}]`,
        fr: `D'après Jabir bin Abdullah: Le Prophète (ﷺ) a dit: "L'exemple du croyant qui récite le Coran est celui d'un cédrat qui a bon goût et bonne odeur. Et l'exemple du croyant qui ne récite pas le Coran est celui d'une datte qui a bon goût mais n'a pas d'odeur. Et l'exemple de l'hypocrite qui récite le Coran est celui d'une fleur parfumée qui a bonne odeur mais goût amer. Et l'exemple de l'hypocrite qui ne récite pas le Coran est celui d'une coloquinte (pomme amère) qui a un goût amer et n'a pas d'odeur." [${bookName.fr} ${hadithNumber}]`,
        es: `Narrado por Jabir bin Abdullah: El Profeta (ﷺ) dijo: "El ejemplo de un creyente que recita el Corán es el de un cidro que sabe bien y huele bien. Y el ejemplo de un creyente que no recita el Corán es el de un dátil que sabe bien pero no tiene olor. Y el ejemplo de un hipócrita que recita el Corán es el de una flor fragante que huele bien pero sabe amargo. Y el ejemplo de un hipócrita que no recita el Corán es el de una coloquíntida (manzana amarga) que sabe amarga y no tiene olor." [${bookName.es} ${hadithNumber}]`,
        id: `Diriwayatkan dari Jabir bin Abdullah: Nabi (ﷺ) bersabda, "Perumpamaan orang beriman yang membaca Al-Qur'an adalah seperti buah limau yang rasanya enak dan baunya harum. Dan perumpamaan orang beriman yang tidak membaca Al-Qur'an adalah seperti kurma yang rasanya enak tetapi tidak berbau. Dan perumpamaan orang munafik yang membaca Al-Qur'an adalah seperti bunga harum yang baunya harum tetapi rasanya pahit. Dan perumpamaan orang munafik yang tidak membaca Al-Qur'an adalah seperti buah hanzhal (apel pahit) yang rasanya pahit dan tidak berbau." [${bookName.id} ${hadithNumber}]`,
        ms: `Diriwayatkan dari Jabir bin Abdullah: Nabi (ﷺ) bersabda, "Perumpamaan orang beriman yang membaca Al-Quran adalah seperti buah limau yang rasanya enak dan baunya harum. Dan perumpamaan orang beriman yang không membaca Al-Quran adalah seperti kurma yang rasanya enak tetapi tidak berbau. Dan perumpamaan orang munafik yang membaca Al-Quran adalah seperti bunga harum yang baunya harum tetapi rasanya pahit. Dan perumpamaan orang munafik yang tidak membaca Al-Quran adalah seperti buah hanzhal (epal pahit) yang rasanya pahit dan tidak berbau." [${bookName.ms} ${hadithNumber}]`,
        bs: `Prenosi se od Jabira bin Abdullaha: Poslanik (ﷺ) je rekao: "Primjer vjernika koji uči Kur'an je kao primjer naranče koja ima dobar okus i miris. I primjer vjernika koji ne uči Kur'an je kao primjer urme koja ima dobar okus, ali nema miris. I primjer licemjera koji uči Kur'an je kao primjer mirisnog cvijeta koji ima dobar miris, ali gorak okus. I primjer licemjera koji ne uči Kur'an je kao primjer hanžala (gorka jabuka) koji ima gorak okus i nema miris." [${bookName.bs} ${hadithNumber}]`,
        ru: `Сообщается, что Джабир бин Абдуллах сказал: "Пророк (ﷺ) сказал: «Пример верующего, который читает Коран, подобен цитрону, у которого хороший вкус и приятный запах. Пример верующего, который не читает Коран, подобен финику, у которого хороший вкус, но нет запаха. Пример лицемера, который читает Коран, подобен ароматному цветку, у которого приятный запах, но горький вкус. Пример лицемера, который не читает Коран, подобен горькой тыкве (горькому яблоку), у которой горький вкус и нет запаха.»" [${bookName.ru} ${hadithNumber}]`,
        fa: `از جابر بن عبدالله روایت است که پیامبر خدا (ﷺ) فرمود: "مثال مؤمنی که قرآن می‌خواند مانند ترنج است که طعمش خوب و بویش خوش است. و مثال مؤمنی که قرآن نمی‌خواند مانند خرما است که طعمش خوب است اما بویی ندارد. و مثال منافقی که قرآن می‌خواند مانند گل خوشبو است که بویش خوش است اما طعمش تلخ است. و مثال منافقی که قرآن نمی‌خواند مانند حنظل (سیب تلخ) است که طعمش تلخ است و بویی ندارد." [${bookName.fa} ${hadithNumber}]`,
        hi: `जाबिर बिन अब्दुल्लाह से वर्णित है: पैगंबर (ﷺ) ने कहा, "उस मोमिन की मिसाल जो कुरआन पढ़ता है एक नींबू जैसी है जिसका स्वाद अच्छा होता है और महक अच्छी होती है। और उस मोमिन की मिसाल जो कुरआन नहीं पढ़ता है एक खजूर जैसी है जिसका स्वाद अच्छा होता है लेकिन कोई महक नहीं होती। और उस मुनाफिक की मिसाल जो कुरआन पढ़ता है एक सुगंधित फूल जैसी है जिसकी महक अच्छी होती है लेकिन स्वाद कड़वा होता है। और उस मुनाफिक की मिसाल जो कुरआन नहीं पढ़ता है एक हंजल (कड़वा सेब) जैसी है जिसका स्वाद कड़वा होता है और कोई महक नहीं होती।" [${bookName.hi} ${hadithNumber}]`,
        si: `ජාබිර් බින් අබ්දුල්ලාහ් වෙතින් වාර්තා වේ: නබි (ﷺ) වහන්සේ මෙසේ වදාළේය: "කුර්ආනය කියවන මු'මින් තැනැකුවෙකුගේ උදාහරණය රසවත් සුගන්ධවත් ලෙමන් ඵලයක් වැනිය. කුර්ආනය නොකියවන මු'මින් තැනැකුවෙකුගේ උදාහරණය රසවත් නමුත් සුවඳ නොමැති ඉඳි ඵලයක් වැනිය. කුර්ආනය කියවන මුනාෆික් තැනැකුවෙකුගේ උදාහරණය සුගන්ධවත් නමුත් තිත්ත රසැති සුවඳවත් මලක් වැනිය. කුර්ආනය නොකියවන මුනාෆික් තැනැකුවෙකුගේ උදාහරණය තිත්ත රසැති හා සුවඳ නොමැති කොලොක්වින්ත් (තිත්ත ඇපල්) ඵලයක් වැනිය." [${bookName.si} ${hadithNumber}]`,
        tl: `Isinalaysay ni Jabir bin Abdullah: Ang Propeta (ﷺ) ay nagsabi, "Ang halimbawa ng isang mananampalataya na bumibigkas ng Qur'an ay tulad ng isang citron na masarap ang lasa at mabango ang amoy. At ang halimbawa ng isang mananampalataya na hindi bumibigkas ng Qur'an ay tulad ng isang datiles na masarap ang lasa ngunit walang amoy. At ang halimbawa ng isang mapagpaimbabaw na bumibigkas ng Qur'an ay tulad ng isang mabangong bulaklak na mabango ang amoy ngunit mapait ang lasa. At ang halimbawa ng isang mapagpaimbabaw na hindi bumibigkas ng Qur'an ay tulad ng isang colocynth (mapait na mansanas) na mapait ang lasa at walang amoy." [${bookName.tl} ${hadithNumber}]`,
        zh: `据贾比尔·本·阿卜杜拉传述：先知（ﷺ）说："诵读《古兰经》的信士的例子就像香橼，味道好闻，气味芬芳。不诵读《古兰经》的信士的例子就像椰枣，味道甜美但没有气味。诵读《古兰经》的伪信士的例子就像芬芳的花朵，气味芬芳但味道苦涩。不诵读《古兰经》的伪信士的例子就像苦瓜（苦苹果），味道苦涩且没有气味。" [${bookName.zh} ${hadithNumber}]`
      },
      {
        en: `Narrated Abu Huraira: The Prophet (ﷺ) said, "The signs of a hypocrite are three: Whenever he speaks, he tells a lie; whenever he is entrusted, he proves to be dishonest; whenever he promises, he breaks his promise." [${bookName.en} ${hadithNumber}]`,
        vi: `Thuật lại từ Abu Huraira: Nhà tiên tri (ﷺ) nói, "Dấu hiệu của kẻ đạo đức giả có ba: Khi nào hắn nói, hắn nói dối; khi nào được ủy thác, hắn chứng tỏ không trung thực; khi nào hứa, hắn thất hứa." [${bookName.vi} ${hadithNumber}]`,
        bn: `আবু হুরায়রা থেকে বর্ণিত: নবী (ﷺ) বলেছেন, "মুনাফিকের লক্ষণ তিনটি: যখনই সে কথা বলে, সে মিথ্যা বলে; যখনই তার কাছে আমানত রাখা হয়, সে অসাধু প্রমাণিত হয়; যখনই সে প্রতিশ্রুতি দেয়, সে তার প্রতিশ্রুতি ভঙ্গ করে।" [${bookName.bn} ${hadithNumber}]`,
        ar: `عن أبي هريرة قال: قال رسول الله صلى الله عليه وسلم: "آية المنافق ثلاث: إذا حدث كذب، وإذا وعد أخلف، وإذا اؤتمن خان." [${bookName.ar} ${hadithNumber}]`,
        ur: `حضرت ابو ہریرہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: "منافق کی تین نشانیاں ہیں: جب بات کرے تو جھوٹ بولے، جب اس کے پاس امانت رکھی جائے تو خیانت کرے، جب وعدہ کرے تو توڑ دے۔" [${bookName.ur} ${hadithNumber}]`,
        tr: `Ebu Hureyre'den rivayet edildiğine göre: Peygamber (ﷺ) şöyle buyurdu: "Münafığın alametleri üçtür: Konuştuğunda yalan söyler, kendisine bir şey emanet edildiğinde hainlik eder, söz verdiğinde sözünden döner." [${bookName.tr} ${hadithNumber}]`,
        fr: `D'après Abou Hourayra: Le Prophète (ﷺ) a dit: "Les signes de l'hypocrite sont au nombre de trois: lorsqu'il parle, il ment; lorsqu'on lui confie quelque chose, il trahit; lorsqu'il promet, il ne tient pas sa promesse." [${bookName.fr} ${hadithNumber}]`,
        es: `Narrado por Abu Huraira: El Profeta (ﷺ) dijo: "Los signes de un hipócrita son tres: cuando habla, miente; cuando se le confía algo, es deshonesto; cuando promete, rompe su promesa." [${bookName.es} ${hadithNumber}]`,
        id: `Diriwayatkan dari Abu Huraira: Nabi (ﷺ) bersabda, "Tanda-tanda orang munafik ada tiga: Apabila berbicara, ia berdusta; apabila dipercayai, ia berkhianat; apabila berjanji, ia mengingkari janjinya." [${bookName.id} ${hadithNumber}]`,
        ms: `Diriwayatkan dari Abu Hurairah: Nabi (ﷺ) bersabda, "Tanda-tanda orang munafik ada tiga: Apabila bercakap, ia berbohong; apabila diberi amanah, ia khianat; apabila berjanji, ia mungkir janji." [${bookName.ms} ${hadithNumber}]`,
        bs: `Prenosi se od Ebu Hurejre: Poslanik (ﷺ) je rekao: "Znakovi licemjera su tri: Kada govori, laže; kada mu se povjeri, pokaže se nepoštenim; kada obeća, prekrši svoje obećanje." [${bookName.bs} ${hadithNumber}]`,
        ru: `Сообщается, что Абу Хурайра сказал: "Пророк (ﷺ) сказал: «Признаки лицемера — три: когда он рассказывает, он лжёт; когда ему доверяют, он предаёт; когда он обещает, он нарушает своё обещание.»" [${bookName.ru} ${hadithNumber}]`,
        fa: `از ابوهریره روایت است که پیامبر خدا (ﷺ) فرمود: "نشانه‌های منافق سه چیز است: وقتی سخن می‌گوید دروغ می‌گوید، وقتی به او امانت داده می‌شود خیانت می‌کند، وقتی وعده می‌دهد وعده‌اش را می‌شکند." [${bookName.fa} ${hadithNumber}]`,
        hi: `अबू हुरैरा से वर्णित है: पैगंबर (ﷺ) ने कहा, "मुनाफिक के तीन लक्षण हैं: जब भी वह बोलता है, झूठ बोलता है; जब भी उसे अमानत दी जाती है, वह बेईमान साबित होता है; जब भी वह वादा करता है, अपना वादा तोड़ देता है।" [${bookName.hi} ${hadithNumber}]`,
        si: `අබු හුරයිරා වෙතින් වාර්තා වේ: නබි (ﷺ) වහන්සේ මෙසේ වදාළේය: "මුනාෆික් තැනැකුවෙකුගේ ලකුණු තුනක් ඇත: ඔහු කතා කරන විට, ඔහු බොරු කියයි; ඔහු විශ්වාසයට පත් කරන විට, ඔහු නොසැබෑ බව පෙන්වයි; ඔහු පොරොන්දු වෙන විට, ඔහු තම පොරොන්දු බිඳ දමයි." [${bookName.si} ${hadithNumber}]`,
        tl: `Isinalaysay ni Abu Huraira: Ang Propeta (ﷺ) ay nagsabi, "Ang mga palatandaan ng isang mapagpaimbabaw ay tatlo: Kapag siya ay nagsalita, siya ay nagsasabi ng kasinungalingan; kapag siya ay pinagkatiwalaan, siya ay napatunayang hindi tapat; kapag siya ay nangako, siya ay sumira sa kanyang pangako." [${bookName.tl} ${hadithNumber}]`,
        zh: `据艾布·胡莱赖传述：先知（ﷺ）说："伪信士的标志有三：说话时撒谎；受委托时背信；许诺时失信。" [${bookName.zh} ${hadithNumber}]`
      }
      // Add more hadith texts as needed...
    ];
    
    const hadithText = hadithTexts[hadithNumber % hadithTexts.length];
    
    const translations = {};
    CONFIG.languages.forEach(lang => {
      translations[lang] = hadithText[lang] || `[${lang.toUpperCase()}] Hadith ${hadithNumber} from ${bookName.en} - Chapter: ${chapterName}. This is a comprehensive hadith about Islamic teachings.`;
    });
    
    return translations;
  }

  function generateGrade() {
    return {
      en: "Sahih",
      ar: "صحيح",
      vi: "Sahih", 
      bn: "সহীহ",
      ur: "صحیح",
      tr: "Sahih",
      fr: "Sahih",
      es: "Sahih",
      id: "Sahih",
      ms: "Sahih",
      bs: "Sahih",
      ru: "Сахих",
      fa: "صحیح",
      hi: "सहीह",
      si: "සහීහ්",
      tl: "Sahih",
      zh: "健全的"
    };
  }

  function generateExplanation(bookId, chapterId, hadithNumber) {
    return {
      en: `This hadith emphasizes important Islamic teachings about character and faith. It provides guidance for Muslims to develop good character and avoid hypocrisy.`,
      vi: `Hadith này nhấn mạnh những giáo lý quan trọng của Islam về tính cách và đức tin. Nó cung cấp hướng dẫn cho người Hồi giáo phát triển tính cách tốt và tránh đạo đức giả.`,
      bn: `এই হাদিসটি চরিত্র এবং ঈমান সম্পর্কে গুরুত্বপূর্ণ ইসলামিক শিক্ষার উপর জোর দেয়। এটি মুসলমানদের ভাল চরিত্র গড়ে তুলতে এবং ভণ্ডামি এড়াতে নির্দেশনা provides.`,
      ar: `هذا الحديث يؤكد على تعاليم إسلامية مهمة حول الشخصية والإيمان. يقدم توجيهات للمسلمين لتطوير شخصية جيدة وتجنب النفاق.`
    };
  }

  function generateHints(bookId, chapterId, hadithNumber) {
    return {
      en: [
        "Focus on developing good character",
        "Be truthful in speech and actions",
        "Fulfill promises and responsibilities"
      ],
      vi: [
        "Tập trung phát triển tính cách tốt",
        "Thành thật trong lời nói và hành động",
        "Thực hiện lời hứa và trách nhiệm"
      ],
      bn: [
        "ভাল চরিত্র গড়ে তোলার উপর ফোকাস করুন",
        "বক্তব্য এবং কর্মে সত্যবাদী হোন",
        "প্রতিশ্রুতি এবং দায়িত্ব পালন করুন"
      ],
      ar: [
        "ركز على تطوير شخصية جيدة",
        "كن صادقًا في الكلام والأفعال",
        "الوفاء بالوعود والمسؤوليات"
      ]
    };
  }

  function generateReferences(bookId, chapterId, hadithNumber) {
    const bookRefs = {
      1: "Sahih al-Bukhari",
      2: "Sahih Muslim"
    };
    return {
      en: `${bookRefs[bookId]} ${hadithNumber}, Book ${bookId}, Chapter ${chapterId}`,
      vi: `${bookRefs[bookId]} ${hadithNumber}, Sách ${bookId}, Chương ${chapterId}`,
      bn: `${bookRefs[bookId]} ${hadithNumber}, বই ${bookId}, অধ্যায় ${chapterId}`,
      ar: `${bookRefs[bookId]} ${hadithNumber}, الكتاب ${bookId}, الباب ${chapterId}`
    };
  }

  function generateWordMeanings(bookId, chapterId, hadithNumber) {
    return {
      en: "believer: mu'min, hypocrite: munafiq, recites: yatlū, promise: wa'd, trust: amanah",
      vi: "believer: tín đồ, hypocrite: kẻ đạo đức giả, recites: đọc, promise: lời hứa, trust: sự tin tưởng",
      bn: "believer: মুমিন, hypocrite: মুনাফিক, recites: তিলাওয়াত করে, promise: প্রতিশ্রুতি, trust: আমানত",
      ar: "المؤمن: الشخص المؤمن, المنافق: الشخص المنافق, يقرأ: يتلو, الوعد: الالتزام, الأمانة: الثقة"
    };
  }

  function generateNarrator(bookId, chapterId, hadithNumber) {
    const narrators = [
      "Abu Huraira", "Aisha", "Umar ibn al-Khattab", "Abu Bakr", 
      "Ali ibn Abi Talib", "Ibn Abbas", "Jabir bin Abdullah"
    ];
    const narrator = narrators[hadithNumber % narrators.length];
    return {
      en: narrator,
      ar: narrator === "Abu Huraira" ? "أبو هريرة" : 
          narrator === "Aisha" ? "عائشة" : 
          narrator === "Umar ibn al-Khattab" ? "عمر بن الخطاب" : narrator,
      vi: narrator,
      bn: narrator
    };
  }

  // Generate category hadiths - FIXED: Use proper parameters
  hadiths.categories = {};
  categories.forEach(category => {
    hadiths.categories[category.id] = [];
    const hadithCount = Math.min(category.hadiths_count, 8);
    
    for (let i = 1; i <= hadithCount; i++) {
      const hadithId = parseInt(`100${category.id}${i}`);
      
      // Use default book and chapter IDs for category hadiths
      const defaultBookId = 1;
      const defaultChapterId = 1;
      
      hadiths.categories[category.id].push({
        id: hadithId,
        hadith_number: i,
        hadeeth: `بسم الله الرحمن الرحيم. حديث خاص بالفئة "${category.name_ar}" - الحديث رقم ${i}`,
        arabic_text: `بسم الله الرحمن الرحيم. حديث خاص بالفئة "${category.name_ar}" - الحديث رقم ${i}`,
        translations: generateCompleteTranslationsForAllLanguages(defaultBookId, defaultChapterId, i, category.name_en),
        grade: generateGrade(),
        book_id: defaultBookId,
        chapter_id: defaultChapterId,
        category_id: category.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  });

  return { books, chapters, hadiths, categories };
}

async function fetchAllData() {
  try {
    // Generate comprehensive sample data
    const { books, chapters, hadiths, categories } = createComprehensiveSampleData();

    // Ensure data directory exists
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }

    // Save all data files
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'books.json'),
      JSON.stringify(books, null, 2)
    );
    console.log(`✅ Saved ${books.length} books`);

    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'chapters.json'),
      JSON.stringify(chapters, null, 2)
    );
    console.log(`✅ Saved chapters for ${Object.keys(chapters).length} books`);

    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'hadiths.json'),
      JSON.stringify(hadiths, null, 2)
    );
    console.log(`✅ Saved hadiths for all books and categories`);

    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'categories.json'),
      JSON.stringify(categories, null, 2)
    );
    console.log(`✅ Saved ${categories.length} categories`);

    // Calculate statistics
    let totalHadiths = 0;
    let totalChapters = 0;
    
    Object.keys(hadiths).forEach(key => {
      if (key === 'categories') {
        Object.keys(hadiths[key]).forEach(catId => {
          totalHadiths += hadiths[key][catId].length;
        });
      } else {
        Object.keys(hadiths[key]).forEach(chapterId => {
          totalHadiths += hadiths[key][chapterId].length;
          totalChapters++;
        });
      }
    });

    console.log('\n🎉 Comprehensive data generation completed!');
    console.log('\n📊 Summary:');
    console.log(`   Books: ${books.length}`);
    console.log(`   Chapters: ${totalChapters}`);
    console.log(`   Hadiths: ${totalHadiths}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Languages: ${CONFIG.languages.length}`);
    
    // Show sample data structure
    console.log('\n🔍 Sample Hadith Structure:');
    const sampleBookId = 1;
    const sampleChapterId = 1;
    if (hadiths[sampleBookId] && hadiths[sampleBookId][sampleChapterId]) {
      const sampleHadith = hadiths[sampleBookId][sampleChapterId][0];
      console.log(`   Book ${sampleBookId}, Chapter ${sampleChapterId}, Hadith 1:`);
      console.log(`     - ID: ${sampleHadith.id}`);
      console.log(`     - Arabic: ${sampleHadith.arabic_text.substring(0, 50)}...`);
      console.log(`     - Translations: ${Object.keys(sampleHadith.translations).length} languages`);
      console.log(`     - English: ${sampleHadith.translations['en'].substring(0, 80)}...`);
      console.log(`     - Vietnamese: ${sampleHadith.translations['vi'].substring(0, 80)}...`);
      console.log(`     - Bengali: ${sampleHadith.translations['bn'].substring(0, 80)}...`);
    }

  } catch (error) {
    console.error('❌ Error generating data:', error);
  }
}

// Run the script
fetchAllData();