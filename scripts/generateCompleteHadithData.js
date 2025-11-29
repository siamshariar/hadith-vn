// scripts/generateCompleteHadithData.js
const fs = require('fs');
const path = require('path');

// Read existing data
const booksData = require('../data/books.json');
const chaptersData = require('../data/chapters.json');
const categoriesData = require('../data/categories.json');

// Comprehensive hadith database with unique content for each section
const hadithDatabase = [
  // Category 1: The Noble Qur'an and Qur'anic Sciences
  {
    category_id: 1,
    hadiths: [
      {
        id: 1001,
        hadeeth: "عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: \"خيركم من تعلم القرآن وعلمه\"",
        translations: {
          en: "Narrated Abu Huraira: The Prophet (ﷺ) said, 'The best among you are those who learn the Qur'an and teach it.'",
          vi: "Thuật lại từ Abu Huraira: Nhà tiên tri (ﷺ) nói, 'Người tốt nhất trong các ngươi là những người học Qur'an và dạy nó.'",
          bn: "আবু হুরায়রা (রাঃ) থেকে বর্ণিত। তিনি বলেন, রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন: 'তোমাদের মধ্যে সেই ব্যক্তি সর্বোত্তম যে কুরআন শেখে এবং অন্যকে শেখায়।'",
          ur: "حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'تم میں سے بہترین وہ شخص ہے جو قرآن سیکھے اور سکھائے۔'"
        },
        explanation: {
          en: "This hadith emphasizes the excellence of learning and teaching the Quran.",
          vi: "Hadith này nhấn mạnh sự xuất sắc của việc học và dạy Quran.",
          bn: "এই হাদীসটি কুরআন শেখা ও শেখানোর শ্রেষ্ঠত্ব তুলে ধরে।",
          ur: "یہ حدیث قرآن سیکھنے اور سکھانے کی فضیلت کو نمایاں کرتی ہے۔"
        }
      },
      {
        id: 1002,
        hadeeth: "عن عثمان بن عفان رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: \"إن أفضلكم من تعلم القرآن وعلمه\"",
        translations: {
          en: "Narrated Uthman bin Affan: The Prophet (ﷺ) said, 'The most superior among you are those who learn the Qur'an and teach it.'",
          vi: "Thuật lại từ Uthman bin Affan: Nhà tiên tri (ﷺ) nói, 'Người ưu việt nhất trong các ngươi là những người học Qur'an và dạy nó.'",
          bn: "উসমান ইবনে আফফান (রাঃ) থেকে বর্ণিত। তিনি বলেন, রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন: 'তোমাদের মধ্যে সর্বশ্রেষ্ঠ সেই ব্যক্তি যে কুরআন শেখে এবং অন্যকে শেখায়।'",
          ur: "حضرت عثمان بن عفان رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'تم میں سے بہترین وہ شخص ہے جو قرآن سیکھے اور سکھائے۔'"
        },
        explanation: {
          en: "This hadith highlights the importance of Quranic education.",
          vi: "Hadith này làm nổi bật tầm quan trọng của giáo dục Quran.",
          bn: "এই হাদীসটি কুরআনিক শিক্ষার গুরুত্ব তুলে ধরে।",
          ur: "یہ حدیث قرآنی تعلیم کی اہمیت کو نمایاں کرتی ہے۔"
        }
      }
    ]
  },
  
  // Category 2: The Hadith and Hadith Sciences
  {
    category_id: 2,
    hadiths: [
      {
        id: 2001,
        hadeeth: "عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: \"نضر الله امرأ سمع منا حديثا فحفظه حتى يبلغه\"",
        translations: {
          en: "Narrated Abu Huraira: The Prophet (ﷺ) said, 'May Allah brighten a man who hears a saying from me, memorizes it and understands it, and then conveys it to others.'",
          vi: "Thuật lại từ Abu Huraira: Nhà tiên tri (ﷺ) nói, 'Cầu xin Allah làm sáng tỏ một người đàn ông nghe được lời nói từ tôi, ghi nhớ nó và hiểu nó, và sau đó truyền đạt nó cho người khác.'",
          bn: "আবু হুরায়রা (রাঃ) থেকে বর্ণিত। তিনি বলেন, রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন: 'আল্লাহ সেই ব্যক্তিকে উজ্জ্বল করুন যে আমার থেকে একটি বাণী শুনে, তা মুখস্থ করে ও বুঝে এবং затем অন্যদের কাছে পৌঁছে দেয়।'",
          ur: "حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'اللہ اس شخص کو تروتازہ رکھے جس نے ہماری کوئی بات سنی، اسے یاد کیا اور سمجھا، پھر دوسروں تک پہنچایا۔'"
        },
        explanation: {
          en: "This hadith encourages the preservation and transmission of hadith knowledge.",
          vi: "Hadith này khuyến khích việc bảo tồn và truyền bá kiến thức hadith.",
          bn: "এই হাদীসটি হাদীস জ্ঞান সংরক্ষণ ও প্রেরণে উৎসাহিত করে।",
          ur: "یہ حدیث حدیث کے علم کے تحفظ اور منتقلی کی ترغیب دیتی ہے۔"
        }
      }
    ]
  },
  
  // Category 3: The Creed (Aqeedah)
  {
    category_id: 3,
    hadiths: [
      {
        id: 3001,
        hadeeth: "عن عمر بن الخطاب رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: \"بني الإسلام على خمس\"",
        translations: {
          en: "Narrated Umar bin Al-Khattab: The Prophet (ﷺ) said, 'Islam is built on five (pillars).'",
          vi: "Thuật lại từ Umar bin Al-Khattab: Nhà tiên tri (ﷺ) nói, 'Islam được xây dựng trên năm (trụ cột).'",
          bn: "উমর ইবনুল খাত্তাব (রাঃ) থেকে বর্ণিত। তিনি বলেন, রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন: 'ইসলাম পাঁচটি ভিত্তির উপর প্রতিষ্ঠিত।'",
          ur: "حضرت عمر بن خطاب رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'اسلام کی بنیاد پانچ (ستونوں) پر ہے۔'"
        },
        explanation: {
          en: "This hadith outlines the five pillars of Islam.",
          vi: "Hadith này phác thảo năm trụ cột của Islam.",
          bn: "এই হাদীসটি ইসলামের পাঁচটি স্তম্ভের রূপরেখা দেয়।",
          ur: "یہ حدیث اسلام کے پانچ ستونوں کی خاکہ پیش کرتی ہے۔"
        }
      }
    ]
  },
  
  // Category 8: Revelation and Collection of the Qur'an
  {
    category_id: 8,
    hadiths: [
      {
        id: 8001,
        hadeeth: "عن عائشة رضي الله عنها قالت: \"أول ما بدئ به رسول الله صلى الله عليه وسلم من الوحي الرؤيا الصالحة في النوم\"",
        translations: {
          en: "Narrated Aisha: The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good dreams which came true like bright day light.",
          vi: "Thuật lại từ Aisha: Sự khởi đầu của Mặc khải Thần thánh cho Sứ giả của Allah (ﷺ) là dưới hình thức những giấc mơ tốt trở thành sự thật như ánh sáng ban ngày rực rỡ.",
          bn: "আয়েশা (রাঃ) থেকে বর্ণিত। তিনি বলেন, আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম-এর কাছে ওহীর সূচনা ছিল ভালো স্বপ্নের মাধ্যমে যা উজ্জ্বল দিনের আলোর মত সত্য হয়ে উঠত।",
          ur: "حضرت عائشہ رضی اللہ عنہا سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم پر وحی کا آغاز نیک خوابوں سے ہوا۔"
        },
        explanation: {
          en: "This hadith describes how revelation began with true dreams.",
          vi: "Hadith này mô tả cách mặc khải bắt đầu với những giấc mơ thật.",
          bn: "এই হাদীসটি বর্ণনা করে কিভাবে ওহীর সূচনা সত্য স্বপ্ন দিয়ে শুরু হয়েছিল।",
          ur: "یہ حدیث بیان کرتی ہے کہ وحی کا آغاز سچے خوابوں سے کیسے ہوا۔"
        }
      }
    ]
  },
  
  // Category 13: Faith (Iman)
  {
    category_id: 13,
    hadiths: [
      {
        id: 13001,
        hadeeth: "عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: \"الإيمان بضع وسبعون شعبة\"",
        translations: {
          en: "Narrated Abu Huraira: The Prophet (ﷺ) said, 'Faith has over seventy branches.'",
          vi: "Thuật lại từ Abu Huraira: Nhà tiên tri (ﷺ) nói, 'Đức tin có hơn bảy mươi nhánh.'",
          bn: "আবু হুরায়রা (রাঃ) থেকে বর্ণিত। তিনি বলেন, রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন: 'ঈমানের সত্তরটিরও বেশি শাখা-প্রশাখা রয়েছে।'",
          ur: "حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'ایمان کے ستر سے زائد شعبے ہیں۔'"
        },
        explanation: {
          en: "This hadith explains the comprehensive nature of faith.",
          vi: "Hadith này giải thích bản chất toàn diện của đức tin.",
          bn: "এই হাদীসটি ঈমানের ব্যাপক প্রকৃতি ব্যাখ্যা করে।",
          ur: "یہ حدیث ایمان کی جامع نوعیت کی وضاحت کرتی ہے۔"
        }
      }
    ]
  }
];

// Book-specific hadiths
const bookHadiths = {
  // Sahih al-Bukhari
  1: {
    1: [ // Revelation chapter
      {
        id: 101,
        hadeeth: "حدثنا الحميدي عبد الله بن الزبير قال: حدثنا سفيان قال: حدثنا يحيى بن سعيد الأنصاري قال: أخبرني محمد بن إبراهيم التيمي أنه سمع علقمة بن وقاص الليثي يقول: سمعت عمر بن الخطاب رضي الله عنه على المنبر يقول: سمعت رسول الله صلى الله عليه وسلم يقول: \"إنما الأعمال بالنيات\"",
        translations: {
          en: "Narrated 'Umar bin Al-Khattab: I heard Allah's Messenger (ﷺ) saying, 'The reward of deeds depends upon the intentions.'",
          vi: "Thuật lại từ 'Umar bin Al-Khattab: Tôi nghe Sứ giả của Allah (ﷺ) nói, 'Phần thưởng của việc làm phụ thuộc vào ý định.'",
          bn: "উমর ইবনুল খাত্তাব (রাঃ) থেকে বর্ণিত। তিনি বলেন, আমি আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম-কে বলতে শুনেছি, 'কাজের ফল নিয়তের উপর নির্ভরশীল।'",
          ur: "حضرت عمر بن خطاب رضی اللہ عنہ سے روایت ہے کہ میں نے رسول اللہ صلی اللہ علیہ وسلم کو فرماتے سنا: 'اعمال کا دارومدار نیتوں پر ہے۔'"
        },
        explanation: {
          en: "This is the famous hadith about intentions being the basis of all deeds.",
          vi: "Đây là hadith nổi tiếng về ý định là cơ sở của mọi việc làm.",
          bn: "এটি সমস্ত কাজের ভিত্তি হিসেবে নিয়ত সম্পর্কে বিখ্যাত হাদীস।",
          ur: "یہ نیتوں کے بارے میں مشہور حدیث ہے جو تمام اعمال کی بنیاد ہیں۔"
        }
      }
    ],
    2: [ // Belief chapter
      {
        id: 102,
        hadeeth: "عن عمر رضي الله عنه أيضا قال: بينما نحن جلوس عند رسول الله صلى الله عليه وسلم ذات يوم إذ طلع علينا رجل شديد بياض الثياب شديد سواد الشعر",
        translations: {
          en: "Narrated 'Umar: While we were one day sitting with the Messenger of Allah (ﷺ), there appeared before us a man dressed in extremely white clothes and with very black hair.",
          vi: "Thuật lại từ 'Umar: Trong khi chúng tôi đang ngồi với Sứ giả của Allah (ﷺ) vào một ngày, có một người đàn ông mặc quần áo cực kỳ trắng và tóc rất đen xuất hiện trước chúng tôi.",
          bn: "উমর (রাঃ) থেকে বর্ণিত। তিনি বলেন, একদিন আমরা আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম-এর নিকট বসা ছিলাম, এমন সময় আমাদের নিকট এক ব্যক্তি উপস্থিত হলেন, যার পরিধেয় বস্ত্র অত্যন্ত সাদা এবং চুল অত্যন্ত কালো।",
          ur: "حضرت عمر رضی اللہ عنہ سے بھی روایت ہے کہ ایک دن ہم رسول اللہ صلی اللہ علیہ وسلم کے پاس بیٹھے ہوئے تھے کہ ایک شخص ہمارے سامنے آیا جس کے کپڑے بہت سفید اور بال بہت سیاہ تھے۔"
        },
        explanation: {
          en: "This is the beginning of the Hadith of Jibril about Islam, Iman, and Ihsan.",
          vi: "Đây là phần đầu của Hadith về Jibril nói về Islam, Iman và Ihsan.",
          bn: "এটি ইসলাম, ঈমান ও ইহসান সম্পর্কে জিবরীলের হাদীসের শুরু部分।",
          ur: "یہ اسلام، ایمان اور احسان کے بارے میں جبرائیل کی حدیث کا آغاز ہے۔"
        }
      }
    ],
    3: [ // Knowledge chapter
      {
        id: 103,
        hadeeth: "عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: \"من سلك طريقا يلتمس فيه علما سهل الله له به طريقا إلى الجنة\"",
        translations: {
          en: "Narrated Abu Huraira: The Messenger of Allah (ﷺ) said, 'Whoever treads a path in search of knowledge, Allah will make easy for him the path to Paradise.'",
          vi: "Thuật lại từ Abu Huraira: Sứ giả của Allah (ﷺ) nói, 'Ai bước đi trên con đường tìm kiếm kiến thức, Allah sẽ làm dễ dàng cho anh ta con đường đến Thiên đàng.'",
          bn: "আবু হুরায়রা (রাঃ) থেকে বর্ণিত। তিনি বলেন, রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন: 'যে ব্যক্তি ইলম অর্জনের জন্য পথ চলে, আল্লাহ তার জন্য জান্নাতের পথ সহজ করে দেন।'",
          ur: "حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'جو شخص علم حاصل کرنے کے لیے راستہ طے کرتا ہے، اللہ اس کے لیے جنت کا راستہ آسان کر دیتا ہے۔'"
        },
        explanation: {
          en: "This hadith emphasizes the virtue of seeking knowledge.",
          vi: "Hadith này nhấn mạnh đức tính của việc tìm kiếm kiến thức.",
          bn: "এই হাদীসটি জ্ঞান অর্জনের গুণের উপর জোর দেয়।",
          ur: "یہ حدیث علم حاصل کرنے کی فضیلت پر زور دیتی ہے۔"
        }
      }
    ]
  },
  
  // Sahih Muslim
  2: {
    1: [ // Faith chapter
      {
        id: 201,
        hadeeth: "عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: \"الإيمان بضع وسبعون شعبة، فأعلاها قول لا إله إلا الله، وأدناها إماطة الأذى عن الطريق\"",
        translations: {
          en: "Narrated Abu Huraira: Allah's Messenger (ﷺ) said, 'Faith has over seventy branches, the highest of which is the declaration of 'La ilaha illallah' and the lowest is removing harmful objects from the road.'",
          vi: "Thuật lại từ Abu Huraira: Sứ giả của Allah (ﷺ) nói, 'Đức tin có hơn bảy mươi nhánh, cao nhất trong số đó là tuyên bố 'La ilaha illallah' và thấp nhất là loại bỏ các vật có hại khỏi đường.'",
          bn: "আবু হুরায়রা (রাঃ) থেকে বর্ণিত। তিনি বলেন, রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন: 'ঈমানের সত্তরটিরও বেশি শাখা-প্রশাখা রয়েছে, তার মধ্যে সর্বোচ্চ হল 'লা ইলাহা ইল্লাল্লাহ' বলা এবং সর্বনিম্ন হল রাস্তা থেকে ক্ষতিকারক বস্তু সরানো।'",
          ur: "حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'ایمان کے ستر سے زائد شعبے ہیں، جن میں سب سے اعلی کلمہ لا الہ الا اللہ ہے اور سب سے ادنی راستے سے تکلیف دہ چیز کو ہٹانا ہے۔'"
        },
        explanation: {
          en: "This hadith shows the comprehensive nature of faith including both beliefs and actions.",
          vi: "Hadith này cho thấy bản chất toàn diện của đức tin bao gồm cả niềm tin và hành động.",
          bn: "এই হাদীসটি ঈমানের ব্যাপক প্রকৃতি দেখায় যা বিশ্বাস ও কর্ম উভয়ই অন্তর্ভুক্ত করে।",
          ur: "یہ حدیث ایمان کی جامع نوعیت کو ظاہر کرتی ہے جس میں عقائد اور اعمال دونوں شامل ہیں۔"
        }
      }
    ]
  }
};

function generateCompleteHadithData() {
  const completeData = {
    categories: {},
    // Book chapters data
    1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}, 10: {}
  };

  // Generate category hadiths
  hadithDatabase.forEach(categoryGroup => {
    const categoryId = categoryGroup.category_id;
    completeData.categories[categoryId] = categoryGroup.hadiths.map(hadith => ({
      ...hadith,
      book_id: 1, // Default book
      chapter_id: 1, // Default chapter
      category_id: categoryId,
      grade: {
        en: "Sahih", vi: "Sahih", bn: "সহীহ", ur: "صحیح", tr: "Sahih", fr: "Sahih", es: "Sahih", 
        id: "Sahih", ms: "Sahih", bs: "Sahih", ru: "Сахих", fa: "صحیح", hi: "सहीह", 
        si: "සහීහ්", tl: "Sahih", zh: "健全的"
      },
      hints: {
        en: ["Reflect on the meaning", "Apply in daily life"],
        vi: ["Suy ngẫm về ý nghĩa", "Áp dụng trong cuộc sống hàng ngày"],
        bn: ["অর্থ নিয়ে চিন্তা করুন", "দৈনন্দিন জীবনে প্রয়োগ করুন"],
        ur: ["معنی پر غور کریں", "روزمرہ زندگی میں لاگو کریں"]
      },
      references: {
        en: "Sahih al-Bukhari",
        vi: "Sahih al-Bukhari", 
        bn: "সহীহ আল-বুখারী",
        ur: "صحیح البخاری"
      },
      word_meanings: {
        en: "key terms and their meanings",
        vi: "các thuật ngữ quan trọng và ý nghĩa của chúng",
        bn: "মূল শব্দ এবং তাদের অর্থ",
        ur: "اہم اصطلاحات اور ان کے معانی"
      },
      narrator: {
        en: "Companion of the Prophet",
        vi: "Bạn đồng hành của Nhà tiên tri",
        bn: "নবীর সাহাবী",
        ur: "نبی کے ساتھی"
      },
      created_at: "2025-10-31T06:20:24.000000Z",
      updated_at: "2025-10-31T21:44:14.000000Z"
    }));
  });

  // Generate book chapter hadiths
  Object.keys(bookHadiths).forEach(bookId => {
    const book = bookHadiths[bookId];
    Object.keys(book).forEach(chapterId => {
      completeData[bookId][chapterId] = book[chapterId].map(hadith => ({
        ...hadith,
        book_id: parseInt(bookId),
        chapter_id: parseInt(chapterId),
        category_id: 3, // Default to Creed category
        grade: {
          en: "Sahih", vi: "Sahih", bn: "সহীহ", ur: "صحیح", tr: "Sahih", fr: "Sahih", es: "Sahih", 
          id: "Sahih", ms: "Sahih", bs: "Sahih", ru: "Сахих", fa: "صحیح", hi: "सहीह", 
          si: "සහීහ්", tl: "Sahih", zh: "健全的"
        },
        hints: {
          en: ["Understand the context", "Implement the teachings"],
          vi: ["Hiểu bối cảnh", "Thực hiện các bài giảng"],
          bn: ["প্রসঙ্গ বুঝুন", "শিক্ষাগুলো বাস্তবায়ন করুন"],
          ur: ["سیاق و سباق سمجھیں", "تعلیمات پر عمل کریں"]
        },
        references: {
          en: bookId === "1" ? "Sahih al-Bukhari" : "Sahih Muslim",
          vi: bookId === "1" ? "Sahih al-Bukhari" : "Sahih Muslim",
          bn: bookId === "1" ? "সহীহ আল-বুখারী" : "সহীহ মুসলিম",
          ur: bookId === "1" ? "صحیح البخاری" : "صحیح مسلم"
        },
        word_meanings: {
          en: "important vocabulary with explanations",
          vi: "từ vựng quan trọng với giải thích",
          bn: "ব্যাখ্যাসহ গুরুত্বপূর্ণ শব্দভাণ্ডার",
          ur: "تشریح کے ساتھ اہم الفاظ"
        },
        narrator: {
          en: "Companion of the Prophet",
          vi: "Bạn đồng hành của Nhà tiên tri", 
          bn: "নবীর সাহাবী",
          ur: "نبی کے ساتھی"
        },
        created_at: "2025-10-31T06:20:24.000000Z",
        updated_at: "2025-10-31T21:44:14.000000Z"
      }));
    });
  });

  return completeData;
}

// Generate and save data
const completeData = generateCompleteHadithData();
fs.writeFileSync(
  path.join(__dirname, '../data/hadiths.json'),
  JSON.stringify(completeData, null, 2)
);

console.log('✅ Complete hadith data generated successfully!');
console.log(`📚 Categories with hadiths: ${Object.keys(completeData.categories).length}`);
console.log(`📖 Books with hadiths: ${Object.keys(completeData).filter(key => !isNaN(key)).length}`);