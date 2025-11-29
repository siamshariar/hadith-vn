import { server } from "../lib/config";
import {
  getRootCategories,
  getAllCategoriesTree,
  getBooks,
  getAllCategories,
  getLocalBooks,
  getLocalCategories,
} from "../lib/fetch";
import Meta from "../components/core/meta";
import Layout from "../components/layouts/LayoutPrimary";
import Banner from "../components/home/banner";
import CategoryList from "../components/home/category-list";
import BookList from "../components/home/book-list";
import { useEffect, useState } from 'react';
import styles from "../components/home/Home.module.scss";

export default function Home({ rootCategories: initialRootCategories, books: initialBooks, allCategories: initialAllCategories }) {
  const [books, setBooks] = useState(initialBooks || []);
  const [rootCategories, setRootCategories] = useState(initialRootCategories || []);
  const [allCategories, setAllCategories] = useState(initialAllCategories || []);

  // Fetch API data after initial render to update UI exactly (local-first behavior)
  useEffect(() => {
    let mounted = true;
    async function fetchApi() {
      try {
        const apiBooks = await getBooks();
        if (mounted && apiBooks && apiBooks.length > 0) setBooks(apiBooks);
        
        const apiCats = await getRootCategories();
        if (mounted && apiCats && apiCats.length > 0) setRootCategories(apiCats);
        
        const apiAllCats = await getAllCategories();
        if (mounted && apiAllCats && apiAllCats.length > 0) setAllCategories(apiAllCats);
      } catch (err) {
        console.warn('Failed to fetch API books/categories for home:', err);
      }
    }
    const t = setTimeout(fetchApi, 100);
    return () => { mounted = false; clearTimeout(t); };
  }, []);

  return (
    <>
      <Meta
        title="Homepage"
        description="Hadith application in Vietnamese"
        url={server}
        image={`${server}/img/s_logo.png`}
        type="website"
      />

      <Banner />
      
      <div className={styles.twoColumnLayout}>
        <div className={styles.column}>
          <BookList books={books} />
        </div>
        <div className={styles.column}>
          <CategoryList 
            categories={allCategories} 
            title="All Categories" 
            showCount={true}
          />
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  // Use local mock JSON for fast initial page generation
  let rootCategories = getLocalCategories();
  let books = getLocalBooks();
  let allCategories = getLocalCategories();
  
  try {
    // Fetch all categories from API for initial render
    const apiAllCategories = await getAllCategories().catch(() => []);
    if (apiAllCategories && apiAllCategories.length > 0) {
      allCategories = apiAllCategories;
      console.log(`✅ Fetched ${allCategories.length} categories from API`);
    }
  } catch (error) {
    console.warn('Failed to fetch all categories from API, using local data:', error);
  }

  const categoryTree = await getAllCategoriesTree().catch(() => []);

  // Allow empty arrays - don't return notFound
  return {
    props: {
      rootCategories: rootCategories || [],
      books: books || [],
      allCategories: allCategories || [],
      categoryTree: categoryTree || [],
      contentTitle: null,
      selectedCategoryId: null,
    },
    revalidate: 3600, // Revalidate every hour
  };
}