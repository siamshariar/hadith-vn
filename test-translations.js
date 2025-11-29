// Test script to verify translation functionality
const apiBaseUrl = 'http://127.0.0.1:8000/api';

async function testTranslations() {
  try {
    console.log('Testing translation API using built-in fetch...');
    
    // Get a hadith from chapter 241
    const hadithResponse = await fetch(`${apiBaseUrl}/chapters/241/hadiths?page=1`);
    const hadithData = await hadithResponse.json();
    
    if (hadithData.data && hadithData.data.length > 0) {
      const hadith = hadithData.data[0];
      console.log(`Testing hadith ${hadith.id}: ${hadith.hadith_number}`);
      
      // Test translations for all languages
      const languages = ['en', 'ur', 'bn', 'tr', 'fr', 'ru', 'id'];
      const translations = {};
      
      for (const lang of languages) {
        try {
          const translationResponse = await fetch(`${apiBaseUrl}/hadiths/${hadith.id}/translations/${lang}`);
          
          if (translationResponse.ok) {
            const translationData = await translationResponse.json();
            
            if (translationData.success && translationData.data) {
              const translation = translationData.data.translation;
              if (translation?.translation_text) {
                translations[lang] = translation.translation_text.substring(0, 100) + '...';
                console.log(`✓ ${lang}: Found translation`);
              } else {
                console.log(`✗ ${lang}: Translation object empty`);
              }
            } else {
              console.log(`✗ ${lang}: API response not successful`);
            }
          } else {
            console.log(`✗ ${lang}: HTTP ${translationResponse.status}`);
          }
        } catch (error) {
          console.log(`✗ ${lang}: Error - ${error.message}`);
        }
      }
      
      console.log('\nFinal translations object:');
      console.log(JSON.stringify(translations, null, 2));
      
    } else {
      console.log('No hadiths found in chapter 241');
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testTranslations();