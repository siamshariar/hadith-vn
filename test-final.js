// Test using local data functions
const { getHadithsByChapter, getHadithDetails } = require('./lib/fetch.js');

async function testLocalDataFunctions() {
  console.log('=== Testing Local Data Functions ===');

  try {
    const bookId = 1;
    const chapterId = 1; // First chapter

    console.log(`Testing Book ${bookId}, Chapter ${chapterId}`);

    // Test getHadithsByChapter
    const hadiths = await getHadithsByChapter(bookId, chapterId);
    console.log(`✅ Found ${hadiths.length} hadiths in chapter ${chapterId}`);

    if (hadiths.length > 0) {
      const firstHadith = hadiths[0];
      console.log(`\nFirst hadith ID: ${firstHadith.id}`);
      console.log(`Arabic text: ${firstHadith.arabic_text ? 'Present' : 'Missing'}`);
      console.log(`Translations available: ${Object.keys(firstHadith.translations || {}).join(', ')}`);

      // Test getHadithDetails
      const hadithDetails = await getHadithDetails(bookId, firstHadith.hadith_number);
      console.log(`\n=== Hadith Details Test ===`);
      console.log(`Title: ${hadithDetails?.title || 'Missing'}`);
      console.log(`Arabic text: ${hadithDetails?.arabic_text ? 'Present' : 'Missing'}`);
      console.log(`Grade: ${hadithDetails?.grade || 'Missing'}`);
      console.log(`Available translations: ${Object.keys(hadithDetails?.translations || {}).join(', ')}`);

      // Test component data structure
      console.log(`\n=== Component Data Structure ===`);
      console.log(`Book: ${hadithDetails?.book ? 'Present' : 'Missing'}`);
      console.log(`Chapter: ${hadithDetails?.chapter ? 'Present' : 'Missing'}`);
      console.log(`Explanation: ${hadithDetails?.explanation ? 'Present' : 'Missing'}`);
      console.log(`Hints: ${hadithDetails?.hints ? 'Present' : 'Missing'}`);
      console.log(`References: ${hadithDetails?.references ? 'Present' : 'Missing'}`);

      // Test translations for component
      const availableTranslations = hadithDetails?.translations ?
        Object.entries(hadithDetails.translations).filter(([lang, text]) => text && text.trim()) : [];

      console.log(`\n=== Translations for Component ===`);
      console.log(`Available translations count: ${availableTranslations.length}`);

      if (availableTranslations.length > 0) {
        console.log('✅ Component would show translations');
        availableTranslations.forEach(([lang, text]) => {
          console.log(`  ${lang}: ${text.substring(0, 50)}...`);
        });
      } else {
        console.log('❌ Component would show "No translations available for this hadith"');
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testLocalDataFunctions();