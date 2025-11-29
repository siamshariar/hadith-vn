import { server } from "../../../lib/config";
import {
  getAllCategories,
  getAllCategoriesTree,
  getCategoryById,
  getHadithsByCategory,
  getLocalCategories,
  getSubcategories,
  getLocalHadithsByCategory,
} from "../../../lib/fetch";
import Meta from "../../../components/core/meta";
import Layout from "../../../components/layouts/LayoutSecondary";
import CategoryContent from "../../../components/content/Category";
import { useEffect, useState } from 'react';

export default function Categories({ category, hadiths, categoryId, categoryTree, subcategories }) {
  const [localHadiths, setLocalHadiths] = useState(hadiths || []);
  const [localSubcategories, setLocalSubcategories] = useState(subcategories || []);
  const [localCategory, setLocalCategory] = useState(category);
  const [loading, setLoading] = useState(false);

  const title = localCategory ? localCategory.title : `Category ${categoryId}`;
  const description = localCategory ? `Category ${localCategory.title}. Hadith application in Vietnamese.` : 'Hadith application in Vietnamese.';
  const url = localCategory ? `${server}/categories/${localCategory.id}/hadiths` : `${server}/categories/${categoryId}/hadiths`;

  // Fetch updated data after initial render
  useEffect(() => {
    let mounted = true;
    async function fetchUpdatedData() {
      if (localHadiths.length > 0) return; // Don't refetch if we already have data
      
      setLoading(true);
      try {
        console.log(`🔄 Client-side fetching updated data for category ${categoryId}`);
        const updatedHadiths = await getHadithsByCategory(categoryId);
        const updatedSubcategories = await getSubcategories(categoryId);
        const updatedCategory = await getCategoryById(categoryId);
        
        if (mounted) {
          console.log(`✅ Client-side found ${updatedHadiths.length} hadiths`);
          if (updatedHadiths && updatedHadiths.length > 0) setLocalHadiths(updatedHadiths);
          if (updatedSubcategories && updatedSubcategories.length > 0) setLocalSubcategories(updatedSubcategories);
          if (updatedCategory) setLocalCategory(updatedCategory);
        }
      } catch (err) {
        console.warn('Failed to fetch updated category data:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    
    const timer = setTimeout(fetchUpdatedData, 100);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [categoryId, localHadiths.length]);

  return (
    <>
      <Meta
        title={title}
        description={description}
        url={url}
        image={`${server}/img/s_logo.png`}
        type="website"
      />

      {loading && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Loading hadiths...</p>
        </div>
      )}

      <CategoryContent 
        hadiths={localHadiths} 
        category={localCategory} 
        categoryId={categoryId} 
        subcategories={localSubcategories}
        categoryTree={categoryTree}
      />
    </>
  );
}

Categories.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const id = encodeURI(context.params.id);
  const categoryId = parseInt(id);
  
  console.log(`🔄 getStaticProps: Fetching data for category ${categoryId}`);
  
  try {
    // Get category data
    const category = await getCategoryById(categoryId);
    const categoryList = await getAllCategories();
    const categoryTree = await getAllCategoriesTree();
    const subcategories = await getSubcategories(categoryId);
    
    // Get hadiths for this category - IMPORTANT: Use local data first
    let hadiths = [];
    try {
      // First try local data for fast response
      hadiths = getLocalHadithsByCategory(categoryId);
      console.log(`📚 Local hadiths for category ${categoryId}: ${hadiths.length}`);
      
      // If no local hadiths, try API
      if (hadiths.length === 0) {
        console.log(`🔍 No local hadiths found, trying API for category ${categoryId}`);
        hadiths = await getHadithsByCategory(categoryId);
      }
    } catch (error) {
      console.warn('Failed to fetch hadiths, using local data:', error.message);
      hadiths = getLocalHadithsByCategory(categoryId);
    }

    console.log(`✅ Final hadiths count for category ${categoryId}: ${hadiths.length}`);

    return {
      props: {
        categoryList: categoryList || [],
        categoryTree: categoryTree || [],
        categoryId,
        category: category || null,
        hadiths: hadiths || [],
        subcategories: subcategories || [],
        selectedCategoryId: categoryId,
        backLink: "/",
        key: categoryId,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    // Fallback to local data
    const localCategories = getLocalCategories();
    const localCategory = localCategories.find(cat => cat.id === categoryId) || null;
    const localHadiths = getLocalHadithsByCategory(categoryId);
    const localSubcategories = localCategories.filter(cat => cat.parent_id === categoryId);
    
    console.log(`🔄 Fallback: Using local data for category ${categoryId}: ${localHadiths.length} hadiths`);
    
    return {
      props: {
        categoryList: localCategories,
        categoryTree: [],
        categoryId,
        category: localCategory,
        hadiths: localHadiths,
        subcategories: localSubcategories,
        selectedCategoryId: categoryId,
        backLink: "/",
        key: categoryId,
      },
      revalidate: 3600,
    };
  }
}

export async function getStaticPaths() {
  let paths = [];
  try {
    const categories = await getAllCategories();
    // Generate paths for all categories (not just root)
    categories.slice(0, 50).forEach((category) => {
      let id = encodeURI(category.id);
      let obj = { params: { id: id } };
      paths.push(obj);
    });
    console.log(`📁 Generated ${paths.length} static paths for categories`);
  } catch (error) {
    console.error('Error generating static paths, using local data:', error);
    // Fallback to local categories
    const localCategories = getLocalCategories();
    localCategories.slice(0, 50).forEach((category) => {
      let id = encodeURI(category.id);
      let obj = { params: { id: id } };
      paths.push(obj);
    });
  }

  return {
    paths: paths,
    fallback: 'blocking',
  };
}