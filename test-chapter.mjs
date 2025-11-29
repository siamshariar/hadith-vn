// Simple test to reproduce the translation issue
import { getHadithsByChapter } from './lib/fetch.js';

async function testChapter() {
  console.log('Testing chapter translation fetching...');
  
  try {
    const hadiths = await getHadithsByChapter(1, 5); // Book 1, Chapter 5 (Prayer)
    
    if (hadiths && hadiths.length > 0) {
      const firstHadith = hadiths[0];
      console.log('First hadith:', firstHadith.title);
      console.log('Arabic text:', firstHadith.hadeeth ? 'Found' : 'Missing');
      console.log('Translations found:', Object.keys(firstHadith.translations || {}));
      
      if (firstHadith.translations) {
        Object.entries(firstHadith.translations).forEach(([lang, text]) => {
          console.log(`${lang}: ${text.substring(0, 50)}...`);
        });
      } else {
        console.log('❌ No translations object found');
      }
    } else {
      console.log('❌ No hadiths returned');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testChapter();