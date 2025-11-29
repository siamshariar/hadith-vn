import HadithCard from "./HadithListCard";
import styles from "./Content.module.scss";
import { getLocalCategories, getCategoryById } from "../../lib/fetch";
import { useEffect, useState } from 'react';

export default function CategoryContent({ hadiths, category, categoryId, book, bookId, breadcrumbPath, pageTitle, categoryTree, subcategories }) {
  const [currentCategory, setCurrentCategory] = useState(category);
  const [currentSubcategories, setCurrentSubcategories] = useState(subcategories || []);
  const [currentHadiths, setCurrentHadiths] = useState(hadiths || []);

  // Update state when props change
  useEffect(() => {
    setCurrentCategory(category);
    setCurrentSubcategories(subcategories || []);
    setCurrentHadiths(hadiths || []);
  }, [category, subcategories, hadiths]);

  // Fetch category details if not provided
  useEffect(() => {
    async function fetchCategoryDetails() {
      if (!currentCategory && categoryId) {
        try {
          const categoryData = await getCategoryById(categoryId);
          if (categoryData) {
            setCurrentCategory(categoryData);
          } else {
            // Fallback to local data
            const localCategories = getLocalCategories();
            const localCategory = localCategories.find(cat => cat.id === categoryId);
            setCurrentCategory(localCategory || { id: categoryId, title: `Category ${categoryId}` });
          }
        } catch (error) {
          console.warn('Failed to fetch category details:', error);
          // Fallback to local data
          const localCategories = getLocalCategories();
          const localCategory = localCategories.find(cat => cat.id === categoryId);
          setCurrentCategory(localCategory || { id: categoryId, title: `Category ${categoryId}` });
        }
      }
    }

    fetchCategoryDetails();
  }, [currentCategory, categoryId]);

  // Use provided pageTitle or build from category data
  const getPageTitle = () => {
    if (pageTitle) return pageTitle;
    
    // For chapter pages
    if (category && (category.chapter_number || category.number)) {
      const chapterNumber = category.id || category.chapter_number || category.number || category.chapter_id || categoryId;
      const chapterName = category.title || category.name_en || category.chapter_title || category.name || 'Chapter';
      return `Chapter ${chapterNumber} — ${chapterName}`;
    }
    
    // For category pages
    return currentCategory ? (currentCategory.title || currentCategory.name_en || `Category ${currentCategory.id}`) : `Category ${categoryId}`;
  };

  const title = getPageTitle();

  // Build breadcrumb for the page
  const getBreadcrumbItems = () => {
    // If breadcrumbPath is provided (for chapter pages), use it
    if (breadcrumbPath && breadcrumbPath.length > 0) {
      return breadcrumbPath;
    }
    
    // For category pages, build from category data
    const items = [];
    
    // Home
    items.push({
      type: 'home',
      text: 'Home',
      icon: '🏠',
      href: '/'
    });
    
    // Build category hierarchy
    if (currentCategory) {
      // If it's a subcategory, find its parent
      if (currentCategory.parent_id !== null) {
        // Try to find parent category from local data first
        const localCategories = getLocalCategories();
        let parentCategory = localCategories.find(cat => cat.id === currentCategory.parent_id);
        
        // If not found in local data, try categoryTree
        if (!parentCategory && categoryTree && categoryTree.length > 0) {
          const findParentInTree = (categories, parentId) => {
            for (const cat of categories) {
              if (cat.id === parentId) return cat;
              if (cat.children && cat.children.length > 0) {
                const found = findParentInTree(cat.children, parentId);
                if (found) return found;
              }
            }
            return null;
          };
          
          for (const rootCat of categoryTree) {
            parentCategory = findParentInTree([rootCat], currentCategory.parent_id);
            if (parentCategory) break;
          }
        }

        // Add parent category to breadcrumb
        if (parentCategory) {
          items.push({
            type: 'category',
            text: parentCategory.title || parentCategory.name_en || `Category ${parentCategory.id}`,
            href: `/categories/${parentCategory.id}/hadiths`
          });
        } else {
          // If parent not found but we know it's a subcategory, show generic parent
          items.push({
            type: 'category',
            text: 'Parent Category',
            href: '/'
          });
        }
      } else {
        // This is a root category, no parent to show
      }
      
      // Add current category
      items.push({
        type: 'category',
        text: currentCategory.title || currentCategory.name_en || `Category ${currentCategory.id}`,
        href: null // Current page, no link
      });
    } else {
      // Fallback without category data
      items.push({
        type: 'category',
        text: `Category ${categoryId}`,
        href: null
      });
    }
    
    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Show subcategories if available
  const showSubcategories = currentSubcategories && currentSubcategories.length > 0;

  // Get hadith count for display
  const getHadithCount = () => {
    if (currentCategory && currentCategory.hadiths_count > 0) {
      return currentCategory.hadiths_count;
    }
    return currentHadiths ? currentHadiths.length : 0;
  };

  const hadithCount = getHadithCount();

  console.log(`🎯 CategoryContent rendering: ${currentHadiths.length} hadiths, ${currentSubcategories.length} subcategories`);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1 className={styles.title_text}>{title}</h1>
          {/* {hadithCount > 0 && (
            <div className={styles.subtitle}>
              {hadithCount} hadiths available
            </div>
          )} */}
        </div>

        {/* Show subcategories if available */}
        {/* {showSubcategories && (
          <div className={styles.subcategories}>
            <h3 className={styles.subcategories_title}>Subcategories</h3>
            <div className={styles.subcategories_grid}>
              {currentSubcategories.map((subcategory) => (
                <a
                  key={subcategory.id}
                  href={`/categories/${subcategory.id}/hadiths`}
                  className={styles.subcategory_card}
                >
                  <div className={styles.subcategory_name}>
                    {subcategory.title || subcategory.name_en || `Category ${subcategory.id}`}
                  </div>
                  {subcategory.hadiths_count > 0 && (
                    <div className={styles.subcategory_count}>
                      {subcategory.hadiths_count} hadiths
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )} */}

        <div className={styles.verses}>
          {currentHadiths && currentHadiths.length > 0 ? (
            currentHadiths.map((hadith, index) => (
              <HadithCard
                key={hadith.id || index}
                hadith={hadith}
                bookName={book?.name_en || book?.title || hadith.book?.name_en || hadith.book_name}
                chapterName={category ? (category.title || category.name_en || category.chapter_title) : (hadith.chapter?.name_en || hadith.chapter_name)}
                breadcrumbPath={breadcrumbItems.filter(item => item.type !== 'home')}
              />
            ))
          ) : (
            <div className={styles.no_hadiths}>
              <div className={styles.no_hadiths_icon}>📖</div>
              <h3>No hadiths available</h3>
              <p>There are no hadiths found in this {category ? 'chapter' : 'category'}.</p>
              {hadithCount > 0 && (
                <p className={styles.note}>
                  Note: The API reports {hadithCount} hadiths in this {category ? 'chapter' : 'category'}, 
                  but they might not be accessible at the moment.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}