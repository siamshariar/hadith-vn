import { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import HadithCard from "./HadithListCard";
import styles from "./Content.module.scss";

export default function BookContent({ book, chapters, hadithsByChapter }) {
  const { theme } = useContext(SettingsContext);
  const [expandedChapters, setExpandedChapters] = useState({});

  // Expand first chapter by default
  useState(() => {
    if (chapters && chapters.length > 0) {
      setExpandedChapters({ [chapters[0].id]: true });
    }
  }, [chapters]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  return (
    <div className={`${styles.wrapper} ${theme}`}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1 className={styles.title_text}>{book.title || book.name_en || book.name_ar}</h1>
        </div>

        <div className={styles.chapters}>
          {chapters && chapters.map((chapter) => {
            const chapterHadiths = hadithsByChapter[chapter.id] || [];
            const isExpanded = expandedChapters[chapter.id];

            return (
              <div key={chapter.id} className={styles.chapter}>
                <div
                  className={styles.chapter_header}
                  onClick={() => toggleChapter(chapter.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <h2 className={styles.chapter_title}>
                    {chapter.title || chapter.chapter_title || `Chapter ${chapter.id}`}
                  </h2>
                  <span className={styles.expand_icon}>
                    {isExpanded ? '▼' : '▶'} ({chapterHadiths.length} hadiths)
                  </span>
                </div>

                {isExpanded && (
                  <div className={styles.chapter_hadiths}>
                    {chapterHadiths.length > 0 ? (
                      chapterHadiths.map((hadith, index) => (
                        <HadithCard key={`${chapter.id}-${hadith.id || index}`} hadith={hadith} bookName={book.title || book.name_en} />
                      ))
                    ) : (
                      <p className={styles.no_hadiths}>No hadiths available for this chapter</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.print_footer}>
          <span>Vietnamese Hassan</span>
          <span>www.quran.vn</span>
        </div>
      </div>
    </div>
  );
}