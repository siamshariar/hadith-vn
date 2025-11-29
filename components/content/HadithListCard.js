import Link from "next/link";
import { useState, useEffect, useContext, useRef } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { getHadithDetailsById, getTranslations, SUPPORTED_LANGUAGES } from "../../lib/fetch";
import { config } from "../../lib/config";
import styles from "./HadithCard.module.scss";

const HadithCard = ({ hadith, bookId, bookName, chapterName, breadcrumbPath }) => {
  const [expanded, setExpanded] = useState(false);
  const [completeHadith, setCompleteHadith] = useState(hadith);
  const [selectedLanguage, setSelectedLanguage] = useState(config.language);
  const [loadingTranslations, setLoadingTranslations] = useState(false);
  const { theme } = useContext(SettingsContext);

  // Check if multi-translations are enabled
  const multiTranslationsEnabled = config.enableMultiTranslations;

  // Language names mapping
  const languageOptions = {
    en: 'English',
    vi: 'Tiếng Việt',
    ar: 'العربية',
    ur: 'اردو',
    bn: 'বাংলা',
    tr: 'Türkçe',
    fr: 'Français',
    es: 'Español',
    id: 'Bahasa Indonesia',
    ms: 'Bahasa Melayu',
    bs: 'Bosanski',
    ru: 'Русский',
    fa: 'فارسی',
    hi: 'हिन्दी',
    si: 'සිංහල',
    tl: 'Tagalog',
    zh: '中文'
  };

  // UI Text translations for different languages
  const uiTexts = {
    en: {
      home: 'Home',
      chapter: 'Chapter',
      rating: 'Rating',
      verified: '✓ Verified Hadith',
      expand: 'Show More',
      collapse: 'Hide',
      sahihBukhari: 'Sahih Bukhari',
      explanation: 'Explanation',
      hints: 'Hints',
      references: 'References',
      allTranslations: 'All Translations',
      noTranslations: 'No translations available for this hadith',
      introNumber: '1.',
      wordMeanings: 'Word Meanings',
      narrator: 'Narrator',
      book: 'Book',
      hadithNumber: 'Hadith Number'
    },
    // vi: {
    //   home: 'Trang chủ',
    //   chapter: 'Chương',
    //   rating: 'Xếp hạng',
    //   verified: '✓ Hadith Sahih',
    //   expand: 'Xem thêm',
    //   collapse: 'Ẩn',
    //   sahihBukhari: 'Sahih Bukhari',
    //   explanation: 'Giải thích',
    //   hints: 'Gợi ý',
    //   references: 'Tham khảo',
    //   allTranslations: 'Tất cả bản dịch',
    //   noTranslations: 'Không có bản dịch nào cho hadith này',
    //   introNumber: '1.',
    //   wordMeanings: 'Ý nghĩa từ',
    //   narrator: 'Người kể',
    //   book: 'Sách',
    //   hadithNumber: 'Số Hadith'
    // },
    // bn: {
    //   home: 'হোম',
    //   chapter: 'অধ্যায়',
    //   rating: 'রেটিং',
    //   verified: '✓ সহি হাদিস',
    //   expand: 'আরও দেখুন',
    //   collapse: 'লুকান',
    //   sahihBukhari: 'সহিহ বুখারী',
    //   explanation: 'ব্যাখ্যা',
    //   hints: 'ইঙ্গিত',
    //   references: 'রেফারেন্স',
    //   allTranslations: 'সমস্ত অনুবাদ',
    //   noTranslations: 'এই হাদিসের জন্য কোন অনুবাদ উপলব্ধ নেই',
    //   introNumber: '১।',
    //   wordMeanings: 'শব্দের অর্থ',
    //   narrator: 'বর্ণনাকারী',
    //   book: 'কিতাব',
    //   hadithNumber: 'হাদিস নম্বর'
    // },
    // ar: {
    //   home: 'الرئيسية',
    //   chapter: 'الفصل',
    //   rating: 'التقييم',
    //   verified: '✓ حديث صحيح',
    //   expand: ' عرض المزيد',
    //   collapse: ' إخفاء',
    //   sahihBukhari: 'صحيح البخاري',
    //   explanation: 'الشرح',
    //   hints: 'التلميحات',
    //   references: 'المراجع',
    //   allTranslations: 'جميع الترجمات',
    //   noTranslations: 'لا توجد ترجمات متاحة لهذا الحديث',
    //   introNumber: '1.',
    //   wordMeanings: 'معاني الكلمات',
    //   narrator: 'الراوي',
    //   book: 'الكتاب',
    //   hadithNumber: 'رقم الحديث'
    // },
    // fr: {
    //   home: 'Accueil',
    //   chapter: 'Chapitre',
    //   rating: 'Évaluation',
    //   verified: '✓ Hadith Authentique',
    //   expand: 'Voir Plus',
    //   collapse: 'Masquer',
    //   sahihBukhari: 'Sahih Bukhari',
    //   explanation: 'Explication',
    //   hints: 'Conseils',
    //   references: 'Références',
    //   allTranslations: 'Toutes les Traductions',
    //   noTranslations: 'Aucune traduction disponible pour ce hadith',
    //   introNumber: '1.',
    //   wordMeanings: 'Signification des mots',
    //   narrator: 'Narrateur',
    //   book: 'Livre',
    //   hadithNumber: 'Numéro du Hadith'
    // }
  };

  // Helper function to get language-specific text from objects
  const getLanguageText = (textObj, lang = selectedLanguage) => {
    if (!textObj) return '';
    
    // If it's a string, return it directly
    if (typeof textObj === 'string') return textObj;
    
    // If it's an object with language keys, get the text for the current language
    if (typeof textObj === 'object' && !Array.isArray(textObj)) {
      // Try the selected language first
      if (textObj[lang]) return textObj[lang];
      
      // Fallback to English
      if (textObj['en']) return textObj['en'];
      
      // Fallback to Arabic
      if (textObj['ar']) return textObj['ar'];
      
      // Fallback to any available language
      const firstKey = Object.keys(textObj)[0];
      if (firstKey) return textObj[firstKey];
    }
    
    return '';
  };

  // Get current UI text based on selected language
  const getUIText = (key) => {
    return uiTexts[selectedLanguage]?.[key] || uiTexts['en'][key];
  };

  // Get current translation based on selected language
  const getCurrentTranslation = () => {
    if (!completeHadith?.translations) return '';
    
    // If multi-translations are disabled, only show the configured language
    if (!multiTranslationsEnabled) {
      const value = completeHadith.translations[config.language] || '';
      if (value && typeof value === 'object') {
        return value.translation_text || value.translation || '';
      }
      return value;
    }
    
    // If multi-translations are enabled, show selected language
    const value = completeHadith.translations[selectedLanguage] || completeHadith.translations['en'] || '';
    if (value && typeof value === 'object') {
      return value.translation_text || value.translation || '';
    }
    return value;
  };

  // Get available languages for this hadith
  const getAvailableLanguages = () => {
    if (!completeHadith?.translations) return [config.language];
    
    // If multi-translations are disabled, only show the configured language
    if (!multiTranslationsEnabled) {
      return completeHadith.translations[config.language] ? [config.language] : [config.language];
    }
    
    // If multi-translations are enabled, show all available languages
    return Object.keys(completeHadith.translations).filter(lang => completeHadith.translations[lang]);
  };

  // Build breadcrumb from the path passed from parent component
  const getBreadcrumbItems = () => {
    const items = [];
    
    // Home
    items.push({
      type: 'home',
      text: getUIText('home'),
      icon: '🏠'
    });
    
    // Show breadcrumb path if provided
    if (breadcrumbPath && breadcrumbPath.length > 0) {
      breadcrumbPath.forEach(item => {
        // Handle both object format and simple string format
        if (typeof item === 'object') {
          items.push({
            type: item.type || 'category',
            text: item.text || item.title || item.name_en || 'Unknown'
          });
        } else {
          items.push({
            type: 'category',
            text: item
          });
        }
      });
    } else {
      // Fallback: Show book and chapter if available
      if (bookName) {
        items.push({
          type: 'book',
          text: bookName
        });
      }
      
      if (chapterName) {
        items.push({
          type: 'chapter',
          text: chapterName
        });
      }
    }
    
    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Lazy-load: fetch complete hadith details only when the card enters viewport
  const cardRef = useRef(null);
  useEffect(() => {
    let mounted = true;
    let observer;
    let fetched = false;

    async function fetchDetails() {
      if (!hadith || !hadith.id) return;
      try {
        setLoadingTranslations(true);
        const details = await getHadithDetailsById(hadith.id, { preferLocal: true });
        if (details && mounted) {
          const merged = { ...(completeHadith || hadith), ...details };
          
          // For single translation mode, ensure we have the configured language
          if (!multiTranslationsEnabled && (!merged.translations || !merged.translations[config.language])) {
            try {
              const bookIdToUse = merged.book_id || merged.book?.id || hadith.book_id || hadith.book?.id || null;
              const number = merged.hadith_number || hadith.hadith_number || null;
              let langText = null;
              if (bookIdToUse && number) {
                langText = await getTranslations(bookIdToUse, number, config.language);
              }
              if (!langText) {
                try {
                  const res = await fetch(`${config.apiBaseUrl.replace(/\/$/, '')}/hadeeths/${hadith.id}/translations/${config.language}`);
                  if (res.ok) {
                    const info = await res.json();
                    const data = info.data || info;
                    if (data && (typeof data === 'string' || data.translation_text || data.translation)) {
                      langText = typeof data === 'string' ? data : (data.translation_text || data.translation || (data.translation && data.translation.translation_text) || null);
                    }
                  }
                } catch (err) {
                  // ignore
                }
              }
              if (langText) {
                merged.translations = { ...(merged.translations || {}), [config.language]: langText };
              }
            } catch (err) {
              // ignore fallback translation errors
            }
          }

          if (process.env.NODE_ENV === 'development') {
            console.debug('[dev] HadithListCard fetched details for', hadith.id, merged);
          }
          setCompleteHadith(merged);
        }
      } catch (error) {
        console.warn('Failed to fetch complete hadith details:', error);
      } finally {
        if (mounted) setLoadingTranslations(false);
      }
    }

    // If IntersectionObserver isn't available, fetch immediately
    if (typeof IntersectionObserver === 'undefined') {
      fetchDetails();
      return () => { mounted = false; };
    }

    const el = cardRef.current;
    if (!el) return;

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !fetched) {
          fetched = true;
          fetchDetails();
          if (observer) observer.disconnect();
        }
      });
    }, { rootMargin: '200px' });

    observer.observe(el);

    return () => {
      mounted = false;
      if (observer) observer.disconnect();
    };
  }, [hadith]);

  // When expanded, try to fetch multiple translations for common languages (only if multi-translations enabled)
  useEffect(() => {
    let mounted = true;
    async function fetchMoreTranslations() {
      if (!expanded || !multiTranslationsEnabled) return;
      if (!completeHadith) return;

      // Determine book id and hadith number
      const bookIdToUse = completeHadith.book_id || completeHadith.book?.id || bookId;
      const number = completeHadith.hadith_number;
      if (!bookIdToUse || !number) return;

      // Fetch translations for SUPPORTED_LANGUAGES but limit count to first 8 to avoid too many requests
      const langs = SUPPORTED_LANGUAGES.slice(0, 8);
      // Convert to only those not already present
      const langsToFetch = langs.filter(l => !completeHadith.translations || !completeHadith.translations[l]);
      if (langsToFetch.length === 0) return;

      setLoadingTranslations(true);
      try {
        const results = await Promise.all(
          langsToFetch.map(async (lang) => {
            try {
              const text = await getTranslations(bookIdToUse, number, lang);
              return [lang, text];
            } catch (err) {
              return [lang, null];
            }
          })
        );

        if (!mounted) return;
        const newTranslations = { ...(completeHadith.translations || {}) };
        results.forEach(([lang, text]) => {
          if (text) newTranslations[lang] = text;
        });
        setCompleteHadith(prev => ({ ...prev, translations: newTranslations }));
      } catch (err) {
        console.warn('Failed to fetch multi translations', err);
      } finally {
        if (mounted) setLoadingTranslations(false);
      }
    }

    fetchMoreTranslations();
    return () => { mounted = false; };
  }, [expanded, completeHadith, multiTranslationsEnabled]);

  // Lazy-load translation text for selected language when it's not already available
  useEffect(() => {
    if (!completeHadith) return;
    
    // If multi-translations are disabled, only fetch the configured language
    if (!multiTranslationsEnabled) {
      if (completeHadith.translations && completeHadith.translations[config.language]) return;
      
      const bookIdToUse = completeHadith.book_id || completeHadith.book?.id || bookId;
      const number = completeHadith.hadith_number;
      if (!bookIdToUse || !number) return;

      setLoadingTranslations(true);
      getTranslations(bookIdToUse, number, config.language)
        .then((data) => {
          let text = '';
          if (!data) return;
          if (typeof data === 'string') text = data;
          else if (data.translation) text = data.translation.translation_text || '';
          else if (data.translation_text) text = data.translation_text;
          if (text) {
            setCompleteHadith(prev => ({
              ...prev,
              translations: {
                ...(prev.translations || {}),
                [config.language]: text,
              }
            }));
          }
        })
        .catch((err) => {
          console.warn('Failed to fetch translation for language', config.language, err);
        })
        .finally(() => setLoadingTranslations(false));
    } else {
      // Multi-translations enabled - fetch selected language
      if (completeHadith.translations && completeHadith.translations[selectedLanguage]) return;
      
      const bookIdToUse = completeHadith.book_id || completeHadith.book?.id || bookId;
      const number = completeHadith.hadith_number;
      if (!bookIdToUse || !number) return;

      setLoadingTranslations(true);
      getTranslations(bookIdToUse, number, selectedLanguage)
        .then((data) => {
          let text = '';
          if (!data) return;
          if (typeof data === 'string') text = data;
          else if (data.translation) text = data.translation.translation_text || '';
          else if (data.translation_text) text = data.translation_text;
          if (text) {
            setCompleteHadith(prev => ({
              ...prev,
              translations: {
                ...(prev.translations || {}),
                [selectedLanguage]: text,
              }
            }));
          }
        })
        .catch((err) => {
          console.warn('Failed to fetch translation for language', selectedLanguage, err);
        })
        .finally(() => setLoadingTranslations(false));
    }
  }, [selectedLanguage, completeHadith, multiTranslationsEnabled]);

  const availableTranslations = completeHadith.translations ? 
    Object.entries(completeHadith.translations).filter(([lang, text]) => text && text.trim()) : [];

  const toggleExpanded = () => {
    const willExpand = !expanded;
    setExpanded(willExpand);
    
    // Only fetch immediately if multi-translations are enabled
    if (willExpand && multiTranslationsEnabled && (!completeHadith || !completeHadith.translations || Object.keys(completeHadith.translations || {}).length === 0)) {
      (async () => {
        try {
          setLoadingTranslations(true);
          const details = await getHadithDetailsById(hadith.id, { preferLocal: true });
          if (details) {
            const merged = { ...(completeHadith || hadith), ...details };
            // try en fallback if needed
            const hasTranslations = merged.translations && Object.keys(merged.translations).length > 0;
            if (!hasTranslations) {
              const bookIdToUse = merged.book_id || merged.book?.id || hadith.book_id || hadith.book?.id || null;
              const number = merged.hadith_number || hadith.hadith_number || null;
              let enText = null;
              if (bookIdToUse && number) {
                enText = await getTranslations(bookIdToUse, number, 'en');
              }
              if (enText) merged.translations = { ...(merged.translations || {}), en: enText };
            }
            setCompleteHadith(merged);
            if (process.env.NODE_ENV === 'development') {
              console.debug('[dev] HadithListCard expanded fetchDetails for', hadith.id, merged);
            }
          }
        } catch (err) {
          console.warn('Expanded immediate fetch failed', err);
        } finally {
          setLoadingTranslations(false);
        }
      })();
    }
  };

  // Dev-only JSON inspector toggle
  const [showDebug, setShowDebug] = useState(false);

  const handleCopy = () => {
    const textToCopy = hadith.arabic_text || '';
    navigator.clipboard.writeText(textToCopy);
  };

  const handleBookmark = () => {
    // Bookmark functionality
    console.log('Bookmarked hadith:', hadith);
  };

  return (
    <div ref={cardRef} className={`${styles.wrapper} ${theme}`}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          {breadcrumbItems.map((item, index) => (
            <span key={index} className={styles.breadcrumb_segment}>
              {index > 0 && <span className={styles.breadcrumb_separator}>&gt;</span>}
              {item.icon && <span className={styles.breadcrumb_icon}>{item.icon}</span>}
              <span className={styles.breadcrumb_text}>{item.text}</span>
            </span>
          ))}
        </div>
        
        {/* Only show language selector if multi-translations are enabled */}
        {multiTranslationsEnabled && (
          <div className={styles.language_selector}>
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className={styles.language_select}
            >
              {getAvailableLanguages().map(lang => (
                <option key={lang} value={lang}>
                  {languageOptions[lang] || lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {hadith.introduction && (
        <div className={styles.introduction}>
          <div className={styles.intro_content}>
            <div className={styles.intro_number}>{getUIText('introNumber')}</div>
            <div className={styles.intro_text}>
              <p>{hadith.introduction}</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.hadith_header}>
        <div className={styles.hadith_title_section}>
          <div className={styles.book_icon}>📖</div>
          <div className={styles.title_wrapper}>
            <h3 className={styles.book_reference}>
              {bookName || completeHadith.book?.name_en || getUIText('sahihBukhari')}: {completeHadith.hadith_number || '০১'}
            </h3>
            {completeHadith.narrator && (
              <div className={styles.narrator}>
                <strong>{getUIText('narrator')}:</strong> {getLanguageText(completeHadith.narrator)}
              </div>
            )}
          </div>
        </div>

        <div className={styles.action_buttons}>
          <button className={styles.verified_button}>
            {getLanguageText(completeHadith.grade) ? `✓ ${getLanguageText(completeHadith.grade)}` : getUIText('verified')}
          </button>
          <button className={styles.icon_button} onClick={handleBookmark} title="Bookmark">
            🔖
          </button>
          <button className={styles.icon_button} onClick={handleCopy} title="Copy">
            📋
          </button>
          <button className={styles.icon_button} title="More options">
            ⋯
          </button>
          {process.env.NODE_ENV === 'development' && (
            <button className={styles.icon_button} onClick={() => setShowDebug(s => !s)} title="Toggle debug JSON">
              🐞
            </button>
          )}
        </div>
      </div>

      {completeHadith.arabic_text && (
        <div className={styles.arabic}>
          <p className={styles.arabic_text}>{completeHadith.arabic_text}</p>
        </div>
      )}
      
      {getCurrentTranslation() && (
        <div className={styles.translation}>
          <div className={styles.translation_header}>
            <span className={styles.language_name}>
              {multiTranslationsEnabled 
                ? (languageOptions[selectedLanguage] || selectedLanguage.toUpperCase())
                : (languageOptions[config.language] || config.language.toUpperCase())
              }
            </span>
          </div>
          <p className={styles.translation_text}>{getCurrentTranslation()}</p>
        </div>
      )}
      {loadingTranslations && !getCurrentTranslation() && (
        <div className={styles.translation}>
          <div className={styles.translation_header}>
            <span className={styles.language_name}>
              {multiTranslationsEnabled 
                ? (languageOptions[selectedLanguage] || selectedLanguage.toUpperCase())
                : (languageOptions[config.language] || config.language.toUpperCase())
              }
            </span>
          </div>
          <p className={styles.translation_text}>Loading translation...</p>
        </div>
      )}
      
      {/* Show expanded content for single translation mode with full details */}
      {expanded && (
        <>
          {/* Word Meanings */}
          {completeHadith.word_meanings && (
            <div className={styles.translation}>
              <div className={styles.translation_header}>
                <span className={styles.language_name}>{getUIText('wordMeanings')}</span>
              </div>
              <p className={styles.translation_text}>{getLanguageText(completeHadith.word_meanings)}</p>
            </div>
          )}

          {/* Additional Information */}
          {completeHadith.explanation && (
            <div className={styles.translation}>
              <div className={styles.translation_header}>
                <span className={styles.language_name}>{getUIText('explanation')}</span>
              </div>
              <p className={styles.translation_text}>{getLanguageText(completeHadith.explanation)}</p>
            </div>
          )}

          {completeHadith.hints && (
            <div className={styles.translation}>
              <div className={styles.translation_header}>
                <span className={styles.language_name}>{getUIText('hints')}</span>
              </div>
              <p className={styles.translation_text}>{getLanguageText(completeHadith.hints)}</p>
            </div>
          )}

          {completeHadith.references && (
            <div className={styles.translation}>
              <div className={styles.translation_header}>
                <span className={styles.language_name}>{getUIText('references')}</span>
              </div>
              <p className={styles.translation_text}>{getLanguageText(completeHadith.references)}</p>
            </div>
          )}

          {/* Only show multiple translations if multi-translations are enabled */}
          {multiTranslationsEnabled && availableTranslations.length > 1 && (
            <div className={styles.translations}>
              <h4>{getUIText('allTranslations')}</h4>
              {availableTranslations.map(([lang, text]) => (
                <div key={lang} className={`${styles.translation} ${lang === selectedLanguage ? styles.active : ''}`}>
                  <div className={styles.translation_header}>
                    <span className={styles.language_name}>{languageOptions[lang] || lang.toUpperCase()}</span>
                  </div>
                  <p className={styles.translation_text}>{text}</p>
                </div>
              ))}
            </div>
          )}
          
          {multiTranslationsEnabled && availableTranslations.length === 0 && (
            <div className={styles.no_translations}>
              <p>{getUIText('noTranslations')}</p>
            </div>
          )}
        </>
      )}
      
      {completeHadith.grade && (
        <div className={styles.grade}>
          <span className={styles.grade_label}>{getUIText('rating')}:</span>
          <span className={styles.grade_value}>{getLanguageText(completeHadith.grade)}</span>
        </div>
      )}

      <div className={styles.footer}>
        <button className={`${styles.expand_button} ${expanded ? styles.expanded : ''}`} onClick={toggleExpanded}>
          <svg className={styles.expand_icon} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
          </svg>
          <span className={styles.expand_text}>
            {expanded ? getUIText('collapse') : getUIText('expand')}
          </span>
        </button>
      </div>
      
      {/* Debug JSON view */}
      {/* {showDebug && process.env.NODE_ENV === 'development' && (
        <div className={styles.debug}>
          <pre>{JSON.stringify(completeHadith, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default HadithCard;