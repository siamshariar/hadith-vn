/**
 * COMPREHENSIVE HADITH FETCHING SYSTEM - HadeethEnc Compatible
 * ============================================================
 */

import { config } from "./config";
import booksData from "../data/books.json";
import chaptersData from "../data/chapters.json";
import hadithsData from "../data/hadiths.json";
import categoriesData from "../data/categories.json";

const apiBaseUrl = config.apiBaseUrl;
const language = config.language;

// Convert API translations into a simple map { lang: translationText }
function normalizeTranslations(obj) {
  if (!obj) return {};
  if (typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).every(k => k.length <= 3)) {
    const mapped = {};
    Object.entries(obj).forEach(([k, v]) => {
      if (!v) return;
      if (typeof v === 'string') mapped[k] = v;
      else if (typeof v === 'object' && v.translation_text) mapped[k] = v.translation_text;
      else if (typeof v === 'object' && v.translation) mapped[k] = v.translation?.translation_text || '';
      else mapped[k] = String(v);
    });
    return mapped;
  }

  if (Array.isArray(obj)) {
    return obj.reduce((acc, t) => {
      const lang = t.language || t.lang || t.code || t.translation_lang || null;
      const text = t.translation_text || t.translation?.translation_text || t.text || t.translation || null;
      if (lang && text) acc[lang] = text;
      return acc;
    }, {});
  }

  return {};
}

// Local data helpers
export function getLocalBooks() {
  try {
    return booksData || [];
  } catch (err) {
    return [];
  }
}

export function getLocalCategories() {
  try {
    return categoriesData || [];
  } catch (err) {
    return [];
  }
}

export function getLocalChaptersByBook(bookId) {
  try {
    const chapters = chaptersData[bookId] || chaptersData[parseInt(bookId)] || [];
    return chapters.map(ch => ({
      ...ch,
      name_en: ch.name_en || ch.chapter_title || ch.title || ch.name || '',
      title: ch.name_en || ch.chapter_title || ch.title || ch.name || `Chapter ${ch.id}`
    }));
  } catch (err) {
    return [];
  }
}

export function getLocalHadithsByChapter(bookId, chapterId) {
  try {
    const bookKey = String(bookId);
    const chapterKey = String(chapterId);
    const localBook = hadithsData[bookKey] || {};
    const localList = localBook[chapterKey] || [];

    return localList.map(h => ({
      id: h.id,
      book_id: parseInt(bookKey),
      chapter_id: parseInt(chapterKey),
      hadith_number: h.hadith_number || null,
      arabic_text: h.hadeeth || h.arabic_text || null,
      grade: h.grade || null,
      explanation: h.explanation || null,
      hints: h.hints || null,
      references: h.references || null,
      word_meanings: h.word_meanings || null,
      translations: h.translations || {},
      book: null,
      chapter: null,
      narrator: h.narrator || null,
      category_id: h.category_id || null,
    }));
  } catch (err) {
    return [];
  }
}

// Get hadiths by category from local data
export function getLocalHadithsByCategory(categoryId) {
  try {
    const categoryHadiths = hadithsData.categories || {};
    const hadiths = categoryHadiths[categoryId] || [];
    
    return hadiths.map(h => ({
      id: h.id,
      book_id: h.book_id || null,
      chapter_id: h.chapter_id || null,
      hadith_number: h.hadith_number || null,
      arabic_text: h.hadeeth || h.arabic_text || null,
      grade: h.grade || null,
      explanation: h.explanation || null,
      hints: h.hints || null,
      references: h.references || null,
      word_meanings: h.word_meanings || null,
      translations: h.translations || {},
      book: null,
      chapter: null,
      narrator: h.narrator || null,
      category_id: h.category_id || categoryId,
    }));
  } catch (err) {
    return [];
  }
}

// Get subcategories for a category
export function getLocalSubcategories(parentId) {
  try {
    const allCategories = getLocalCategories();
    return allCategories.filter(cat => cat.parent_id === parentId);
  } catch (err) {
    return [];
  }
}

// Get root categories (parent_id is null)
export function getLocalRootCategories() {
  try {
    const allCategories = getLocalCategories();
    return allCategories.filter(cat => cat.parent_id === null);
  } catch (err) {
    return [];
  }
}

export async function getRootCategories() {
  try {
    // First try local data for immediate response
    const localCategories = getLocalRootCategories();
    if (localCategories && localCategories.length > 0) {
      console.log(`✅ Using ${localCategories.length} local root categories`);
    }

    // Then try API for updated data
    const res = await fetch(`${apiBaseUrl}/categories/roots?language=${language}`);
    
    if (!res.ok) {
      console.warn(`API call failed for root categories: ${res.status}`);
      return localCategories || [];
    }
    
    let info = await res.json();
    let data = info.data || info;
    
    // Map each category with proper title
    const mappedData = Array.isArray(data) ? data.map(category => ({
      ...category,
      title: category.name_en || category.name_ar || category.title,
      id: category.id
    })) : [];
    
    console.log(`✅ Fetched ${mappedData.length} root categories from API`);
    return mappedData.length > 0 ? mappedData : localCategories;
  } catch (error) {
    console.warn('Failed to fetch root categories from API, using local data:', error.message);
    return getLocalRootCategories();
  }
}

export async function getAllCategories() {
  try {
    // First try local data
    const localCategories = getLocalCategories();
    
    // Then try API
    let allCategories = [];
    let morePagesAvailable = true;
    let currentPage = 0;

    while (morePagesAvailable && currentPage < 10) {
      currentPage++;
      const res = await fetch(
        `${apiBaseUrl}/categories?language=${language}&page=${currentPage}`
      );
      if (!res.ok) {
        console.warn(`API returned ${res.status} for categories page ${currentPage}`);
        break;
      }
      let info = await res.json();
      let data = info.data;
      let meta = info.meta;
      
      // Map each category
      const mappedData = data.map(category => ({
        ...category,
        title: category.name_en || category.name_ar
      }));
      allCategories = allCategories.concat(mappedData);
      morePagesAvailable = meta && currentPage < meta.last_page;
    }

    return allCategories.length > 0 ? allCategories : localCategories;
  } catch (error) {
    console.error('Error fetching all categories, using local data:', error.message);
    return getLocalCategories();
  }
}

// export async function getAllCategoriesTree() {
//   try {
//     // First get all categories
//     const allCategories = await getAllCategories();
    
//     const idMapping = allCategories.reduce((acc, el, i) => {
//       acc[el.id] = i;
//       return acc;
//     }, {});

//     let root = [];

//     allCategories.forEach((el) => {
//       // Handle the root element
//       if (el.parent_id === null) {
//         root.push(el);
//         return;
//       }
//       // Use our mapping to locate the parent element in our data array
//       const parentEl = allCategories[idMapping[el.parent_id]];
//       if (parentEl) {
//         parentEl.children = [...(parentEl.children || []), el];
//       }
//     });

//     return root;
//   } catch (error) {
//     console.warn('Failed to fetch categories tree, using local data:', error.message);
//     // Build tree from local data
//     const localCategories = getLocalCategories();
//     const idMapping = localCategories.reduce((acc, el, i) => {
//       acc[el.id] = i;
//       return acc;
//     }, {});

//     let root = [];

//     localCategories.forEach((el) => {
//       if (el.parent_id === null) {
//         root.push(el);
//         return;
//       }
//       const parentEl = localCategories[idMapping[el.parent_id]];
//       if (parentEl) {
//         parentEl.children = [...(parentEl.children || []), el];
//       }
//     });

//     return root;
//   }
// }

export async function getCategoryById(id) {
  try {
    // First try local data
    const localCategories = getLocalCategories();
    const localCategory = localCategories.find(cat => cat.id == id);
    
    // Then try API
    const res = await fetch(
      `${apiBaseUrl}/categories/${id}?language=${language}`
    );
    if (!res.ok) {
      console.warn(`API call failed for category ${id}: ${res.status}`);
      return localCategory || null;
    }
    const info = await res.json();
    const category = info.data || info;

    return {
      ...category,
      title: category.name_en || category.name_ar || category.title
    } || localCategory || null;
  } catch (error) {
    console.warn(`Failed to fetch category ${id}, using local data:`, error.message);
    const localCategories = getLocalCategories();
    return localCategories.find(cat => cat.id == id) || null;
  }
}

export async function getSubcategories(parentId) {
  try {
    // First try local data
    const localSubcategories = getLocalSubcategories(parentId);
    
    // Then try API
    const res = await fetch(
      `${apiBaseUrl}/categories/${parentId}/children?language=${language}`
    );
    if (!res.ok) {
      console.warn(`API call failed for subcategories of ${parentId}: ${res.status}`);
      return localSubcategories;
    }
    const info = await res.json();
    const data = info.data || info;
    
    const mappedData = Array.isArray(data) ? data.map(category => ({
      ...category,
      title: category.name_en || category.name_ar || category.title
    })) : [];
    
    return mappedData.length > 0 ? mappedData : localSubcategories;
  } catch (error) {
    console.warn(`Failed to fetch subcategories for ${parentId}, using local data:`, error.message);
    return getLocalSubcategories(parentId);
  }
}

export async function getHadithsByCategory(id) {
  try {
    // First try local data for immediate response
    const localHadiths = getLocalHadithsByCategory(id);
    console.log(`📚 Found ${localHadiths.length} local hadiths for category ${id}`);
    
    // Then try API for complete data
    console.log(`🔍 Fetching category ${id} with hadiths and translations...`);
    
    const categoryRes = await fetch(
      `${apiBaseUrl}/categories/${id}?language=${language}&include_hadiths=true&limit=50`
    );
    
    if (!categoryRes.ok) {
      console.warn(`API call failed for category ${id} with hadiths: ${categoryRes.status}`);
      return localHadiths;
    }
    
    const categoryData = await categoryRes.json();
    
    if (!categoryData.success || !categoryData.data) {
      console.warn(`Invalid response for category ${id}`);
      return localHadiths;
    }
    
    const category = categoryData.data;
    let allHadiths = [];
    
    // Extract hadiths from the category response
    if (category.hadiths && Array.isArray(category.hadiths)) {
      console.log(`✅ Found ${category.hadiths.length} hadiths in category ${id} from API`);
      
      // Process each hadith with proper translation handling
      allHadiths = await Promise.all(
        category.hadiths.map(async (hadith) => {
          // For single translation mode, fetch complete hadith details
          if (!config.enableMultiTranslations) {
            try {
              const completeHadith = await getHadithDetailsById(hadith.id, { preferLocal: true });
              if (completeHadith) {
                return {
                  id: hadith.id,
                  title: completeHadith.translations?.[language] || `Hadith ${hadith.hadith_number || hadith.id}`,
                  arabic_text: completeHadith.arabic_text || hadith.arabic_text,
                  hadeeth: completeHadith.arabic_text || hadith.arabic_text,
                  translations: { [language]: completeHadith.translations?.[language] },
                  grade: completeHadith.grade || hadith.grade,
                  narrator: completeHadith.narrator || hadith.narrator || null,
                  book_name: completeHadith.book?.name_en || hadith.book?.name || hadith.book_name || null,
                  chapter_name: completeHadith.chapter?.name_en || hadith.chapter?.name || hadith.chapter_name || null,
                  book_id: completeHadith.book_id || hadith.book_id || null,
                  chapter_id: completeHadith.chapter_id || hadith.chapter_id || null,
                  book: completeHadith.book || hadith.book || null,
                  chapter: completeHadith.chapter || hadith.chapter || null,
                  hadith_number: completeHadith.hadith_number || hadith.hadith_number,
                  text_ar: completeHadith.arabic_text || hadith.arabic_text,
                  category_id: id,
                  explanation: completeHadith.explanation || hadith.explanation || null,
                  hints: completeHadith.hints || hadith.hints || null,
                  references: completeHadith.references || hadith.references || null,
                  word_meanings: completeHadith.word_meanings || hadith.word_meanings || null,
                };
              }
            } catch (error) {
              console.warn(`Failed to fetch complete details for hadith ${hadith.id}:`, error.message);
            }
          }
          
          // Fallback to basic hadith data
          let translations = {};
          
          if (hadith.translation) {
            const lang = hadith.translation.localization_code || language;
            const translationText = hadith.translation.translation_text;
            
            if (translationText) {
              translations[lang] = translationText;
            }
          }
          
          if (hadith.translation_fallback) {
            const fallbackLang = language;
            translations[fallbackLang] = hadith.translation_fallback;
          }
          
          return {
            id: hadith.id,
            title: hadith.translation?.translation_text || `Hadith ${hadith.hadith_number || hadith.id}`,
            arabic_text: hadith.arabic_text,
            hadeeth: hadith.arabic_text,
            translations: translations,
            grade: hadith.grade,
            narrator: hadith.narrator || null,
            book_name: hadith.book?.name || hadith.book?.name_en || null,
            chapter_name: hadith.chapter?.name || hadith.chapter?.name_en || null,
            book_id: hadith.book?.id || null,
            chapter_id: hadith.chapter?.id || null,
            book: hadith.book || null,
            chapter: hadith.chapter || null,
            hadith_number: hadith.hadith_number,
            text_ar: hadith.arabic_text,
            category_id: id,
            explanation: hadith.translation?.explanation || null,
            hints: hadith.translation?.hints || null,
            references: hadith.translation?.references || null,
          };
        })
      );
    }
    
    console.log(`🎉 Total hadiths for category ${id}: ${allHadiths.length}`);
    return allHadiths.length > 0 ? allHadiths : localHadiths;
  } catch (error) {
    console.warn(`Failed to fetch hadiths for category ${id}, using local data:`, error.message);
    return getLocalHadithsByCategory(id);
  }
}

export async function getHadithDetailsById(id, opts = { preferLocal: true }) {
  try {
    // For server-side rendering, read data directly from JSON files
    if (typeof window === 'undefined') {
      const hadithsData = require('../data/hadiths.json');
      const booksData = require('../data/books.json');
      const chaptersData = require('../data/chapters.json');
      
      // Search through all hadiths to find by ID
      let foundHadith = null;
      let foundBook = null;
      let foundChapter = null;
      
      // First check categories section
      if (hadithsData.categories) {
        for (const [categoryId, hadiths] of Object.entries(hadithsData.categories)) {
          const hadith = hadiths.find(h => h.id === parseInt(id));
          if (hadith) {
            foundHadith = hadith;
            foundBook = booksData.find(b => b.id === hadith.book_id);
            foundChapter = chaptersData[hadith.book_id]?.find(c => c.id === hadith.chapter_id);
            break;
          }
        }
      }
      
      // If not found in categories, check book chapters
      if (!foundHadith) {
        for (const [bookKey, bookChapters] of Object.entries(hadithsData)) {
          if (bookKey === 'categories') continue; // Skip categories section
          for (const [chapterKey, hadiths] of Object.entries(bookChapters)) {
            const hadith = hadiths.find(h => h.id === parseInt(id));
            if (hadith) {
              foundHadith = hadith;
              foundBook = booksData.find(b => b.id === parseInt(bookKey));
              foundChapter = chaptersData[bookKey]?.find(c => c.id === parseInt(chapterKey));
              break;
            }
          }
          if (foundHadith) break;
        }
      }
      
      if (foundHadith) {
        // For single translation mode, only include the configured language
        let translations = {};
        if (!config.enableMultiTranslations && foundHadith.translations) {
          if (foundHadith.translations[language]) {
            translations[language] = foundHadith.translations[language];
          } else if (foundHadith.translations['en']) {
            translations[language] = foundHadith.translations['en'];
          }
        } else {
          translations = foundHadith.translations || {};
        }
        
        return {
          id: foundHadith.id,
          title: translations[language] || translations['en'] || `Hadith ${foundHadith.hadith_number}`,
          hadeeth: translations[language] || translations['en'] || '',
          arabic_text: foundHadith.hadeeth,
          attribution: foundBook ? foundBook.name_en || foundBook.title : '',
          grade: foundHadith.grade,
          explanation: foundHadith.explanation || null,
          hints: foundHadith.hints || null,
          references: foundHadith.references || null,
          word_meanings: foundHadith.word_meanings || null,
          categories: [],
          translations: translations,
          book: foundBook,
          chapter: foundChapter,
          book_id: foundBook?.id || null,
          chapter_id: foundChapter?.id || null,
          hadith_number: foundHadith.hadith_number,
          narrator: foundHadith.narrator || null,
          language: language
        };
      }
    }
    
    // For client-side, if preferLocal is true, try to find the hadith in local JSON first
    if (opts && opts.preferLocal) {
      try {
        // Try to quickly find local hadith in included JSON
        const local = hadithsData;
        
        // First check categories section
        if (local.categories) {
          for (const [categoryId, hadiths] of Object.entries(local.categories)) {
            const h = hadiths.find(hh => hh.id === parseInt(id));
            if (h) {
              const foundBook = booksData.find(b => b.id === h.book_id);
              const foundChapter = chaptersData[h.book_id]?.find(c => c.id === h.chapter_id);
              
              // For single translation mode, only include the configured language
              let translations = {};
              if (!config.enableMultiTranslations && h.translations) {
                if (h.translations[language]) {
                  translations[language] = h.translations[language];
                } else if (h.translations['en']) {
                  translations[language] = h.translations['en'];
                }
              } else {
                translations = h.translations || {};
              }
              
              return {
                id: h.id,
                title: translations[language] || translations['en'] || `Hadith ${h.hadith_number}`,
                hadeeth: translations[language] || translations['en'] || '',
                arabic_text: h.hadeeth || h.arabic_text || '',
                attribution: foundBook ? foundBook.name_en || foundBook.title : '',
                grade: h.grade,
                explanation: h.explanation || null,
                hints: h.hints || null,
                references: h.references || null,
                word_meanings: h.word_meanings || null,
                categories: [],
                translations: translations,
                book: foundBook || null,
                chapter: foundChapter || null,
                book_id: foundBook?.id || null,
                chapter_id: foundChapter?.id || null,
                hadith_number: h.hadith_number,
                narrator: h.narrator || null,
                language: language
              };
            }
          }
        }
        
        // If not found in categories, check book chapters
        for (const [bookKey, bookChapters] of Object.entries(local)) {
          if (bookKey === 'categories') continue; // Skip categories section
          for (const [chapterKey, hadiths] of Object.entries(bookChapters)) {
            const h = hadiths.find(hh => hh.id === parseInt(id));
            if (h) {
              const foundBook = booksData.find(b => b.id === parseInt(bookKey));
              const foundChapter = chaptersData[bookKey]?.find(c => c.id === parseInt(chapterKey));
              
              // For single translation mode, only include the configured language
              let translations = {};
              if (!config.enableMultiTranslations && h.translations) {
                if (h.translations[language]) {
                  translations[language] = h.translations[language];
                } else if (h.translations['en']) {
                  translations[language] = h.translations['en'];
                }
              } else {
                translations = h.translations || {};
              }
              
              return {
                id: h.id,
                title: translations[language] || translations['en'] || `Hadith ${h.hadith_number}`,
                hadeeth: translations[language] || translations['en'] || '',
                arabic_text: h.hadeeth || h.arabic_text || '',
                attribution: foundBook ? foundBook.name_en || foundBook.title : '',
                grade: h.grade,
                explanation: h.explanation || null,
                hints: h.hints || null,
                references: h.references || null,
                word_meanings: h.word_meanings || null,
                categories: [],
                translations: translations,
                book: foundBook || null,
                chapter: foundChapter || null,
                book_id: foundBook?.id || null,
                chapter_id: foundChapter?.id || null,
                hadith_number: h.hadith_number,
                narrator: h.narrator || null,
                language: language
              };
            }
          }
        }
      } catch (err) {
        // continue with API fallback
      }
    }
    
    // For client-side, use API to fetch complete metadata
    const res = await fetch(`${apiBaseUrl}/hadeeths/one?id=${id}`);
    if (!res.ok) {
      console.warn(`API call failed for hadith ${id}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (data.success && data.data) {
      // normalize translations
      let normalized = normalizeTranslations(data.data.translations);
      
      // For single translation mode, filter to only the configured language
      if (!config.enableMultiTranslations) {
        const filteredTranslations = {};
        if (normalized[language]) {
          filteredTranslations[language] = normalized[language];
        } else if (normalized['en']) {
          filteredTranslations[language] = normalized['en'];
        }
        normalized = filteredTranslations;
      }
      
      return {
        ...data.data,
        translations: normalized,
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching hadith details for ${id}:`, error);
    return null;
  }
}

export async function getBooks() {
  try {
    // First try local data for immediate response
    const localBooks = getLocalBooks();
    
    // Then try API for updated data
    const res = await fetch(`${apiBaseUrl}/books`);
    if (!res.ok) {
      console.warn(`API call failed for books: ${res.status}`);
      return localBooks;
    }
    const data = await res.json();
    return data.success ? data.data : localBooks;
  } catch (error) {
    console.warn('Failed to fetch books from API, using local data:', error.message);
    return getLocalBooks();
  }
}

export async function getChaptersByBook(bookId) {
  try {
    // First try local data for immediate response
    const localChapters = getLocalChaptersByBook(bookId);
    
    // Then try API for updated data
    const res = await fetch(`${apiBaseUrl}/books/${bookId}/chapters`);
    if (!res.ok) {
      console.warn(`API call failed for chapters of book ${bookId}: ${res.status}`);
      return localChapters;
    }
    const data = await res.json();
    const chapters = data.success ? data.data : localChapters;
    // Normalize chapter title fields for consistent UI
    return chapters.map(ch => ({
      ...ch,
      name_en: ch.name_en || ch.chapter_title || ch.title || ch.name || '',
      title: ch.name_en || ch.chapter_title || ch.title || ch.name || `Chapter ${ch.id}`
    }));
  } catch (error) {
    console.warn(`Failed to fetch chapters for book ${bookId} from API, using local data:`, error.message);
    return getLocalChaptersByBook(bookId);
  }
}

export async function getHadithsByChapter(bookId, chapterId, chapterTopic = null) {
  try {
    // First try local data for immediate response
    const localHadiths = getLocalHadithsByChapter(bookId, chapterId);
    
    // Then try API for complete data
    const lang = config.language || 'en';
    let allHadiths = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore && page <= 5) { // Limit to 5 pages for performance
      const apiUrl = `${apiBaseUrl}/books/${bookId}/chapters/${chapterId}/hadeeths?language=${lang}&page=${page}&per_page=50`;
      const res = await fetch(apiUrl);
      if (!res.ok) {
        console.warn(`API call failed for hadiths in book ${bookId}, chapter ${chapterId}, page ${page}: ${res.status}`);
        break;
      }
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        // Format hadiths consistently
        const formattedHadiths = await Promise.all(
          data.data.map(async (h) => {
            // For single translation mode, fetch complete hadith details
            if (!config.enableMultiTranslations) {
              try {
                const completeHadith = await getHadithDetailsById(h.id, { preferLocal: true });
                if (completeHadith) {
                  return {
                    id: h.id,
                    book_id: h.book_id,
                    chapter_id: h.chapter_id,
                    hadith_number: h.hadith_number,
                    arabic_text: completeHadith.arabic_text || h.arabic_text || h.hadeeth_ar || h.text_ar,
                    grade: completeHadith.grade || h.grade,
                    explanation: completeHadith.explanation || h.explanation || null,
                    hints: completeHadith.hints || h.hints || null,
                    word_meanings: completeHadith.word_meanings || h.word_meanings || null,
                    references: completeHadith.references || h.references || null,
                    created_at: h.created_at || new Date().toISOString(),
                    updated_at: h.updated_at || new Date().toISOString(),
                    deleted_at: null,
                    translations: completeHadith.translations || {},
                    book: completeHadith.book || h.book || null,
                    chapter: completeHadith.chapter || h.chapter || null,
                    narrator: completeHadith.narrator || h.narrator || null,
                  };
                }
              } catch (error) {
                console.warn(`Failed to fetch complete details for hadith ${h.id}:`, error.message);
              }
            }
            
            // Fallback to basic hadith data
            return {
              id: h.id,
              book_id: h.book_id,
              chapter_id: h.chapter_id,
              hadith_number: h.hadith_number,
              arabic_text: h.arabic_text || h.hadeeth_ar || h.text_ar,
              grade: h.grade,
              explanation: h.explanation || null,
              hints: h.hints || null,
              word_meanings: h.word_meanings || null,
              references: h.references || null,
              created_at: h.created_at || new Date().toISOString(),
              updated_at: h.updated_at || new Date().toISOString(),
              deleted_at: null,
              translations: {}, // Will be populated below
              book: h.book || null,
              chapter: h.chapter || null
            };
          })
        );
        
        // Fetch translations for each hadith
        const hadithsWithTranslations = await Promise.all(
          formattedHadiths.map(async (hadith) => {
            try {
              // Use /api/hadeeths/one to get complete hadith with all translations
              const completeRes = await fetch(
                `${apiBaseUrl}/hadeeths/one?id=${hadith.id}`
              );
              if (completeRes.ok) {
                const completeData = await completeRes.json();
                if (completeData.success && completeData.data) {
                  const completeHadith = completeData.data;
                  // normalize translations into {lang: text} shape when possible
                  let normTranslations = normalizeTranslations(completeHadith.translations);
                  
                  // For single translation mode, filter to only the configured language
                  if (!config.enableMultiTranslations) {
                    const filteredTranslations = {};
                    if (normTranslations[language]) {
                      filteredTranslations[language] = normTranslations[language];
                    } else if (normTranslations['en']) {
                      filteredTranslations[language] = normTranslations['en'];
                    }
                    normTranslations = filteredTranslations;
                  }
                  
                  return {
                    ...hadith,
                    translations: normTranslations,
                    explanation: completeHadith.explanation || hadith.explanation,
                    hints: completeHadith.hints || hadith.hints,
                    references: completeHadith.references || hadith.references,
                    grade: completeHadith.grade || hadith.grade,
                    narrator: completeHadith.narrator || hadith.narrator,
                    word_meanings: completeHadith.word_meanings || hadith.word_meanings,
                  };
                }
              }
            } catch (error) {
              console.warn(`Failed to fetch complete data for hadith ${hadith.id}:`, error.message);
            }
            // Return hadith as is if complete fetch fails
            return hadith;
          })
        );
        
        allHadiths = allHadiths.concat(hadithsWithTranslations);
        hasMore = data.meta && page < data.meta.last_page;
        page++;
      } else {
        hasMore = false;
      }
    }
    
    console.log(`✅ Fetched ${allHadiths.length} hadiths for Book ${bookId}, Chapter ${chapterId}`);
    return allHadiths.length > 0 ? allHadiths : localHadiths;
  } catch (error) {
    console.error(`Error fetching hadiths for Book ${bookId}, Chapter ${chapterId}, using local data:`, error);
    return getLocalHadithsByChapter(bookId, chapterId);
  }
}

export async function getRandomHadith() {
  try {
    // Fetch random hadith using HadeethEnc endpoint
    const res = await fetch(`${apiBaseUrl}/random?language=${language}`);
    
    if (!res.ok) {
      console.warn(`API call failed for random hadith: ${res.status}`);
      return null;
    }
    
    const info = await res.json();
    const hadith = info.data || info;
    
    if (!hadith || !hadith.id) {
      console.warn('Invalid random hadith response');
      return null;
    }
    
    // For single translation mode, only fetch the configured language
    const languages = config.enableMultiTranslations 
      ? ['ar', 'en', 'bn', 'ur', 'tr', 'fr', 'es', 'id', 'ms', 'bs', 'ru', 'fa', 'hi', 'vi', 'si', 'tl', 'zh']
      : [language];
    
    const translations = {};
    
    await Promise.all(
      languages.map(async (lang) => {
        try {
          const transRes = await fetch(`${apiBaseUrl}/hadeeths/${hadith.id}/translations/${lang}`);
          if (transRes.ok) {
            const transInfo = await transRes.json();
            if (transInfo.success && transInfo.data) {
              translations[lang] = {
                translation_text: transInfo.data.translation || null,
                narrator: transInfo.data.narrator || null,
                explanation: transInfo.data.explanation || null,
                hints: transInfo.data.hints || null,
                references: transInfo.data.references || null,
                narrator_intro: transInfo.data.narrator_intro || null
              };
            }
          }
        } catch (err) {
          console.warn(`Failed to fetch ${lang} translation for random hadith ${hadith.id}:`, err.message);
        }
      })
    );
    
    return {
      id: hadith.id || null,
      title: translations[language]?.translation_text || translations.en?.translation_text || hadith.text || hadith.text_en || hadith.text_ar || `Hadith ${hadith.id}`,
      hadeeth: hadith.text_ar || hadith.arabic_text || hadith.text || null,
      attribution: hadith.book?.name_en || hadith.book_name || null,
      grade: hadith.grade || null,
      explanation: translations[language]?.explanation || translations.en?.explanation || null,
      hints: translations[language]?.hints || translations.en?.hints || null,
      references: translations[language]?.references || translations.en?.references || null,
      narrator: translations[language]?.narrator || translations.en?.narrator || null,
      narrator_intro: translations[language]?.narrator_intro || translations.en?.narrator_intro || null,
      categories: hadith.categories || [],
      book: hadith.book || null,
      chapter: hadith.chapter || null,
      translations: translations,
      book_id: hadith.book?.id || hadith.book_id || null,
      chapter_id: hadith.chapter?.id || hadith.chapter_id || null,
      hadith_number: hadith.hadith_number || hadith.number || null
    };
  } catch (error) {
    console.error('Error fetching random hadith:', error);
    return null;
  }
}

export async function getTranslations(book, number, lang) {
  try {
    // Try local JSON first (fast optimistic UI)
    try {
      const bookKey = String(book);
      const localBook = hadithsData[bookKey] || {};
      for (const [chapterKey, hadithList] of Object.entries(localBook)) {
        const found = hadithList.find(h => h.hadith_number === number || h.id === number || String(h.id) === String(number));
        if (found && found.translations && found.translations[lang]) {
          return found.translations[lang];
        }
      }
      
      // Also check categories section
      if (hadithsData.categories) {
        for (const [categoryId, hadiths] of Object.entries(hadithsData.categories)) {
          const found = hadiths.find(h => h.hadith_number === number || h.id === number || String(h.id) === String(number));
          if (found && found.translations && found.translations[lang]) {
            return found.translations[lang];
          }
        }
      }
    } catch (localErr) {
      // ignore local lookup errors and fall back to API
    }
    
    // Then try API
    const res = await fetch(
      `${apiBaseUrl}/books/${book}/hadiths/${number}/translations/${lang}`
    );
    if (!res.ok) return null;
    const info = await res.json();
    const data = info.data || info;
    // Normalise: return translation text string if available
    if (!data) return null;
    if (typeof data === 'string') return data;
    if (data.translation && data.translation.translation_text) return data.translation.translation_text;
    if (data.translation_text) return data.translation_text;
    if (data.translation) return data.translation;
    return data;
  } catch (error) {
    console.warn(`Failed to fetch translations for book ${book}, number ${number}, lang ${lang}:`, error.message);
    return null;
  }
}

// Add this function to lib/fetch.js (around line 250, after the local data helpers)

// Build proper category tree without duplicates
export function buildCategoryTree(categories) {
  if (!categories || !Array.isArray(categories)) return [];
  
  // Create a map for quick lookup
  const categoryMap = new Map();
  categories.forEach(category => {
    categoryMap.set(category.id, { ...category, children: [] });
  });
  
  const rootCategories = [];
  
  // Build the tree structure
  categories.forEach(category => {
    const node = categoryMap.get(category.id);
    
    if (category.parent_id === null) {
      // This is a root category
      rootCategories.push(node);
    } else {
      // This is a child category, find its parent
      const parent = categoryMap.get(category.parent_id);
      if (parent) {
        // Only add if not already added to prevent duplicates
        if (!parent.children.some(child => child.id === node.id)) {
          parent.children.push(node);
        }
      } else {
        // If parent not found, treat as root (shouldn't happen with proper data)
        console.warn(`Parent ${category.parent_id} not found for category ${category.id}, treating as root`);
        rootCategories.push(node);
      }
    }
  });
  
  return rootCategories;
}

// Update getAllCategoriesTree function to use buildCategoryTree
export async function getAllCategoriesTree() {
  try {
    // First get all categories
    const allCategories = await getAllCategories();
    return buildCategoryTree(allCategories);
  } catch (error) {
    console.warn('Failed to fetch categories tree, using local data:', error.message);
    // Build tree from local data
    const localCategories = getLocalCategories();
    return buildCategoryTree(localCategories);
  }
}

// supported languages list used for multi-language fetch
export const SUPPORTED_LANGUAGES = [
  'ar', 'en', 'bn', 'ur', 'tr', 'fr', 'es', 'id', 'ms', 'bs', 'ru', 'fa', 'hi', 'vi', 'si', 'tl', 'zh'
];

// Add this function to get language-specific data
export function getLocalizedData(data, language) {
  if (!data || typeof data !== 'object') return data;
  
  // For objects with language-specific fields
  if (data[`name_${language}`]) {
    return {
      ...data,
      name: data[`name_${language}`] || data.name_en || data.name_ar,
      title: data[`title_${language}`] || data[`name_${language}`] || data.title || data.name_en,
      description: data[`description_${language}`] || data.description
    };
  }
  
  return data;
}

// Update the getCurrentTranslation function in HadithListCard to use single translation mode
const getCurrentTranslation = () => {
  if (!completeHadith?.translations) return '';
  
  // Single translation mode: only show the configured language
  if (!config.enableMultiTranslations) {
    // First try the configured language
    let translation = completeHadith.translations[config.language];
    
    // If not available, try English as fallback
    if (!translation && config.language !== 'en') {
      translation = completeHadith.translations['en'];
    }
    
    // If still not available, try Arabic
    if (!translation && config.language !== 'ar') {
      translation = completeHadith.translations['ar'];
    }
    
    // Extract text from translation object if needed
    if (translation && typeof translation === 'object') {
      return translation.translation_text || translation.translation || '';
    }
    
    return translation || '';
  }
  
  // Multi-translation mode: show selected language
  const value = completeHadith.translations[selectedLanguage] || completeHadith.translations['en'] || '';
  if (value && typeof value === 'object') {
    return value.translation_text || value.translation || '';
  }
  return value;
};

// Add this function to improve data fetching
export async function getCompleteHadithData(bookId, chapterId) {
  try {
    // First try local data
    const localHadiths = getLocalHadithsByChapter(bookId, chapterId);
    if (localHadiths && localHadiths.length > 0) {
      console.log(`✅ Using ${localHadiths.length} local hadiths for book ${bookId}, chapter ${chapterId}`);
      return localHadiths;
    }

    // Then try API
    const apiHadiths = await getHadithsByChapter(bookId, chapterId);
    if (apiHadiths && apiHadiths.length > 0) {
      console.log(`✅ Fetched ${apiHadiths.length} API hadiths for book ${bookId}, chapter ${chapterId}`);
      return apiHadiths;
    }

    // Final fallback: generate sample data
    console.log(`⚠️  No hadiths found, generating sample data for book ${bookId}, chapter ${chapterId}`);
    return generateSampleHadiths(bookId, chapterId);
    
  } catch (error) {
    console.error(`❌ Error fetching hadith data for book ${bookId}, chapter ${chapterId}:`, error);
    return generateSampleHadiths(bookId, chapterId);
  }
}

function generateSampleHadiths(bookId, chapterId) {
  const sampleCount = 5;
  const hadiths = [];
  
  for (let i = 1; i <= sampleCount; i++) {
    hadiths.push({
      id: parseInt(`${bookId}${chapterId}${i}`),
      book_id: bookId,
      chapter_id: chapterId,
      hadith_number: i,
      arabic_text: `نص الحديث التجريبي ${i} للكتاب ${bookId} والفصل ${chapterId}`,
      translations: {
        en: `Sample hadith text ${i} for book ${bookId} chapter ${chapterId}`,
        vi: `Văn bản hadith mẫu ${i} cho sách ${bookId} chương ${chapterId}`,
        bn: `নমুনা হাদিস পাঠ্য ${i} বই ${bookId} অধ্যায় ${chapterId} এর জন্য`,
        ar: `نص الحديث التجريبي ${i} للكتاب ${bookId} والفصل ${chapterId}`,
        ur: `نمونہ حدیث متن ${i} کتاب ${bookId} باب ${chapterId} کے لیے`
      },
      grade: { en: 'Sahih', ar: 'صحيح' },
      narrator: `Narrator ${i}`,
      explanation: `Explanation for sample hadith ${i}`,
      hints: [`Hint 1 for hadith ${i}`, `Hint 2 for hadith ${i}`],
      references: `Reference for hadith ${i}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return hadiths;
}