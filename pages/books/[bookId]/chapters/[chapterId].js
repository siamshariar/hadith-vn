import { server } from "../../../../lib/config";
import {
  getBooks,
  getChaptersByBook,
  getHadithsByChapter,
  getHadithDetailsById,
  getLocalHadithsByChapter,
  getLocalBooks,
  getLocalChaptersByBook,
} from "../../../../lib/fetch";
import { useEffect, useRef, useState } from 'react';
import Meta from "../../../../components/core/meta";
import Layout from "../../../../components/layouts/LayoutSecondary";
import CategoryContent from "../../../../components/content/Category";

export default function Chapter({ chapter, hadiths, book, bookId, chapterId, chapters }) {
  const [localHadiths, setLocalHadiths] = useState(hadiths || []);
  const [loadingAll, setLoadingAll] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const cancelRef = useRef(false);

  useEffect(() => {
    setLocalHadiths(hadiths || []);
  }, [hadiths]);

  // If we have no hadiths set from server, try to show local mock json immediately,
  // then later client-side update will replace with API results.
  useEffect(() => {
    async function tryLocal() {
      if (!localHadiths || localHadiths.length === 0) {
        const local = getLocalHadithsByChapter(bookId, chapterId);
        if (local && local.length > 0) {
          console.log(`📚 Using ${local.length} local hadiths for initial render`);
          setLocalHadiths(local);
        }
      }
    }
    tryLocal();
  }, [bookId, chapterId, localHadiths]);

  // After initial render with local data, fetch API data to update exactly
  useEffect(() => {
    let mounted = true;
    async function fetchApiHadiths() {
      try {
        console.log(`🔍 Client-side fetching API hadiths for book ${bookId}, chapter ${chapterId}`);
        const apiHadiths = await getHadithsByChapter(bookId, chapterId);
        if (mounted && apiHadiths && apiHadiths.length > 0) {
          console.log(`✅ Client-side updated with ${apiHadiths.length} API hadiths`);
          setLocalHadiths(apiHadiths);
        }
      } catch (err) {
        console.error('Failed to fetch API hadiths:', err);
      }
    }
    
    // Only fetch from API if we don't have hadiths or want to refresh
    if (localHadiths.length === 0) {
      const timer = setTimeout(fetchApiHadiths, 100);
      return () => { mounted = false; clearTimeout(timer); };
    }
  }, [bookId, chapterId, localHadiths.length]);

  async function loadAllTranslations() {
    if (!localHadiths || localHadiths.length === 0) return;
    setLoadingAll(true);
    setProgress({ done: 0, total: localHadiths.length });
    cancelRef.current = false;

    for (let i = 0; i < localHadiths.length; i++) {
      if (cancelRef.current) break;
      const h = localHadiths[i];
      try {
        const details = await getHadithDetailsById(h.id, { preferLocal: true });
        if (details) {
          // merge translations into hadith
          localHadiths[i] = { ...localHadiths[i], translations: details.translations || localHadiths[i].translations || {} };
          setLocalHadiths([...localHadiths]);
        }
      } catch (err) {
        console.error(`Failed to fetch details for hadith ${h.id}:`, err);
      }
      setProgress((p) => ({ ...p, done: p.done + 1 }));
      // small delay to be gentle with API
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 120));
    }

    setLoadingAll(false);
  }

  function cancelLoad() {
    cancelRef.current = true;
    setLoadingAll(false);
  }

  // Build page title with chapter number and name
  const getPageTitle = () => {
    if (!chapter) return `Chapter ${chapterId}`;
    
    const chapterNumber = chapter.id || chapter.chapter_number || chapter.number || chapter.chapter_id || chapterId;
    const chapterName = chapter.title || chapter.name_en || chapter.chapter_title || chapter.name || 'Revelation';
    
    return `Chapter ${chapterNumber} — ${chapterName}`;
  };

  // Build breadcrumb path for the chapter page
  const getBreadcrumbPath = () => {
    const path = [];
    
    if (book) {
      path.push({
        type: 'book',
        text: book.name_en || book.title || 'Book'
      });
    }
    
    if (chapter) {
      const chapterNumber = chapter.id || chapter.chapter_number || chapter.number || chapter.chapter_id || chapterId;
      const chapterName = chapter.title || chapter.name_en || chapter.chapter_title || chapter.name || 'Revelation';
      
      path.push({
        type: 'chapter',
        text: `Chapter ${chapterNumber} — ${chapterName}`
      });
    }
    
    return path;
  };

  const pageTitle = getPageTitle();
  const breadcrumbPath = getBreadcrumbPath();

  // Debug logging
  console.log('Chapter page props:', {
    bookId,
    chapterId,
    book: book?.name_en,
    chapter: chapter?.name_en,
    hadithsCount: localHadiths.length,
    breadcrumbPath,
    pageTitle
  });

  return (
    <>
      <Meta
        title={pageTitle}
        description={`${pageTitle}. Hadith application in Vietnamese.`}
        url={`${server}/books/${bookId}/chapters/${chapterId}`}
        image={`${server}/img/s_logo.png`}
        type="website"
      />

      {/* <div style={{ padding: '12px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={loadAllTranslations} disabled={loadingAll || !localHadiths || localHadiths.length === 0}>
          {loadingAll ? 'Loading translations...' : 'Load all translations'}
        </button>
        {loadingAll && (
          <button onClick={cancelLoad} style={{ marginLeft: 8 }}>
            Cancel
          </button>
        )}
        {loadingAll && (
          <div style={{ marginLeft: 12 }}>
            {progress.done}/{progress.total}
          </div>
        )}
      </div> */}

      <CategoryContent 
        hadiths={localHadiths} 
        category={chapter} 
        book={book} 
        bookId={bookId}
        breadcrumbPath={breadcrumbPath}
        pageTitle={pageTitle}
      />
    </>
  );
}

Chapter.getLayout = function getLayout(page) {
  // Pass chapters and selectedChapterId to Layout for sidebar
  const { book, chapters, chapterId } = page.props;
  return (
    <Layout
      linkPattern="books"
      books={book ? [book] : []}
      selectedBookId={book ? book.id : null}
      chapters={chapters}
      selectedChapterId={chapterId ? parseInt(chapterId) : null}
    >
      {page}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  try {
    const bookId = context.params.bookId;
    const chapterId = context.params.chapterId;
    const bookNum = parseInt(bookId);
    const chapterNum = parseInt(chapterId);
    console.log(`🔄 getServerSideProps: Fetching data for book ${bookId}, chapter ${chapterId}`);

    // Primary attempt: use local data first for fast rendering
    let chapters = getLocalChaptersByBook(bookId);
    let books = getLocalBooks();
    let hadiths = getLocalHadithsByChapter(bookId, chapterId);
    
    console.log(`📚 Local data: ${books.length} books, ${chapters.length} chapters, ${hadiths.length} hadiths`);

    // Then try API for updated data
    try {
      const apiChapters = await getChaptersByBook(bookId);
      if (apiChapters && apiChapters.length > 0) {
        chapters = apiChapters;
        console.log('✅ Using API chapters, count:', chapters.length);
      }
    } catch (e) {
      console.warn('Primary getChaptersByBook failed:', e && e.message);
    }

    try {
      const apiBooks = await getBooks();
      if (apiBooks && apiBooks.length > 0) {
        books = apiBooks;
        console.log('✅ Using API books, count:', books.length);
      }
    } catch (e) {
      console.warn('getBooks failed:', e && e.message);
    }

    try {
      // Only fetch from API if we don't have local hadiths
      if (hadiths.length === 0) {
        const apiHadiths = await getHadithsByChapter(bookId, chapterId);
        if (apiHadiths && apiHadiths.length > 0) {
          hadiths = apiHadiths;
          console.log(`✅ Using API hadiths: ${hadiths.length}`);
        }
      }
    } catch (e) {
      console.warn('getHadithsByChapter failed:', e && e.message);
    }

    let chapter = chapters.find((c) => c.id == chapterNum);
    console.log('🔍 Resolved chapter from chapters list:', !!chapter);

    // If chapter not found but hadiths exist, derive chapter from hadiths[0].chapter
    if (!chapter && hadiths && hadiths.length > 0 && hadiths[0].chapter) {
      chapter = hadiths[0].chapter;
      console.log('✅ Derived chapter from hadiths[0].chapter');
    }

    let book = books.find((b) => b.id == bookNum) || null;
    // If book not found, try derive from hadiths
    if (!book && hadiths && hadiths.length > 0 && hadiths[0].book) {
      book = hadiths[0].book;
      console.log('✅ Derived book from hadiths[0].book');
    }
    
    // Do not redirect if chapter or book not found. Render page with nulls instead.
    if (!book) {
      console.log(`⚠️ Warning: book not found for bookId=${bookId}. Rendering page with null book.`);
    }

    console.log(`🎉 Final data: ${hadiths.length} hadiths for book ${bookId}, chapter ${chapterId}`);

    return {
      props: {
        book: book ? JSON.parse(JSON.stringify(book)) : null,
        chapter: chapter ? JSON.parse(JSON.stringify(chapter)) : null,
        hadiths: hadiths ? hadiths.map((h) => JSON.parse(JSON.stringify(h))) : [],
        chapters: chapters ? chapters.map((c) => JSON.parse(JSON.stringify(c))) : [],
        bookId: bookId,
        chapterId: chapterId,
        selectedCategoryId: null,
        backLink: `/books/${bookId}`,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps (unexpected):', error);
    // On unexpected errors, render the page with empty data instead of redirecting.
    return {
      props: {
        book: null,
        chapter: null,
        hadiths: [],
        chapters: [],
        bookId: context.params.bookId,
        chapterId: context.params.chapterId,
        selectedCategoryId: null,
        backLink: `/books/${context.params.bookId}`,
      },
    };
  }
}