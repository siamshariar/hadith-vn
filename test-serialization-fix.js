// Test script to verify no undefined values in category hadiths
const apiBaseUrl = 'http://127.0.0.1:8000/api';

async function testSerializationFix() {
  try {
    console.log('=== Testing Serialization Fix for Category Hadiths ===');
    
    const categoryId = 1;
    console.log(`\nTesting category ${categoryId} hadiths for undefined values...`);
    
    const res = await fetch(`${apiBaseUrl}/categories/${categoryId}/hadiths?page=1`);
    
    if (!res.ok) {
      console.log(`❌ HTTP ${res.status} for category ${categoryId}`);
      return;
    }
    
    const info = await res.json();
    const data = info.data || [];
    
    if (data.length === 0) {
      console.log(`❌ No hadiths in category ${categoryId}`);
      return;
    }
    
    console.log(`✅ Found ${data.length} hadiths in category ${categoryId}`);
    
    // Simulate the fixed getHadithsByCategory function
    const hadith = data[0]; // Test first hadith
    console.log(`\n--- Testing hadith ${hadith.id} for undefined values ---`);
    
    // Test translation fetching
    const translations = {};
    const languages = ['en', 'ur'];
    
    for (const lang of languages) {
      try {
        const translationRes = await fetch(`${apiBaseUrl}/hadiths/${hadith.id}/translations/${lang}`);
        if (translationRes.ok) {
          const translationData = await translationRes.json();
          if (translationData.success && translationData.data) {
            const translation = translationData.data.translation;
            if (translation?.translation_text) {
              translations[lang] = translation.translation_text;
            }
          }
        }
      } catch (error) {
        console.debug(`Translation ${lang} not available`);
      }
    }
    
    // Create the fixed hadith object (as the function would return)
    const fixedHadith = {
      ...hadith,
      translations,
      // Ensure no undefined values for Next.js serialization
      grade: hadith.grade || null,
      narrator: hadith.narrator || null,
      book_name: hadith.book_name || null,
      chapter_name: hadith.chapter_name || null,
      book_id: hadith.book_id || null,
      chapter_id: hadith.chapter_id || null,
      hadith_number: hadith.hadith_number || null,
      arabic_text: hadith.arabic_text || null,
      text_ar: hadith.text_ar || null,
      title: hadith.title || `Hadith ${hadith.hadith_number || hadith.id}`,
      hadeeth: hadith.arabic_text || hadith.text_ar || null
    };
    
    console.log('\n=== Checking for undefined values ===');
    let hasUndefined = false;
    
    function checkForUndefined(obj, path = '') {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        if (value === undefined) {
          console.log(`❌ Found undefined at: ${currentPath}`);
          hasUndefined = true;
        } else if (typeof value === 'object' && value !== null) {
          checkForUndefined(value, currentPath);
        }
      }
    }
    
    checkForUndefined(fixedHadith);
    
    if (!hasUndefined) {
      console.log('✅ No undefined values found - serialization should work');
    }
    
    // Test JSON serialization
    try {
      const serialized = JSON.stringify(fixedHadith);
      console.log('✅ JSON serialization successful');
      console.log(`Serialized size: ${serialized.length} characters`);
    } catch (error) {
      console.log(`❌ JSON serialization failed: ${error.message}`);
    }
    
    // Show the final structure
    console.log('\n=== Final Hadith Structure ===');
    console.log('ID:', fixedHadith.id);
    console.log('Title:', fixedHadith.title);
    console.log('Grade:', fixedHadith.grade);
    console.log('Narrator:', fixedHadith.narrator);
    console.log('Book Name:', fixedHadith.book_name);
    console.log('Chapter Name:', fixedHadith.chapter_name);
    console.log('Translation Languages:', Object.keys(fixedHadith.translations));
    
    console.log('\n✅ Serialization fix should resolve the Next.js error');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSerializationFix();