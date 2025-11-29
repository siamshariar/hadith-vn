"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Scrollbar from "../core/scrollbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "../icons/Search";
import styles from "./index.module.scss";
import { getChaptersByBook, getHadithsByChapter, getLocalBooks, getLocalCategories, getLocalChaptersByBook, buildCategoryTree } from "../../lib/fetch";

export default function Sidebar({
  categoryList,
  categoryTree,
  selectedCategoryId,
  books = [],
  allChapters = {},
  selectedBookId,
  linkPattern = "categories",
  hadiths = [],
  chapters = [],
  selectedChapterId,
}) {
  const isBooksMode = linkPattern === "books";
  
  // Use local data as fallback if no data provided
  const currentCategoryList = useMemo(() => 
    categoryList && categoryList.length > 0 ? categoryList : getLocalCategories(), 
    [categoryList]
  );
  
  const currentCategoryTree = useMemo(() => 
    categoryTree && categoryTree.length > 0 ? categoryTree : buildCategoryTree(currentCategoryList), 
    [categoryTree, currentCategoryList]
  );
  
  const currentBooks = useMemo(() => 
    books && books.length > 0 ? books : getLocalBooks(), 
    [books]
  );
  
  const items = isBooksMode ? currentBooks : currentCategoryList;
  const tree = isBooksMode ? currentBooks : currentCategoryTree;
  const selectedId = isBooksMode ? selectedBookId : selectedCategoryId;

  const input = useRef(null);
  const closeButton = useRef(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const [bookHadiths, setBookHadiths] = useState({});
  const [loadingBook, setLoadingBook] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const filterItems = (search) => {
    setSearch(search);
    const listToFilter = isBooksMode ? currentBooks : currentCategoryList;
    const filtered = listToFilter.filter((item) => {
      return (
        (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
        (item.name_en && item.name_en.toLowerCase().includes(search.toLowerCase())) ||
        (item.name_ar && item.name_ar.toLowerCase().includes(search.toLowerCase())) ||
        (item.chapter_title && item.chapter_title.toLowerCase().includes(search.toLowerCase())) ||
        (item.hadiths_count && `(${item.hadiths_count})`.includes(search)) ||
        item.id.toString().includes(search)
      );
    });
    setFilteredItems(filtered);
  };

  const handleClose = () => {
    setSearch("");
    if (input.current) {
      input.current.value = "";
    }
  };

  useEffect(() => {
    if (search === "") {
      setIsSearchEmpty(true);
      if (closeButton.current) {
        closeButton.current.style.display = "none";
      }
    } else {
      setIsSearchEmpty(false);
      if (closeButton.current) {
        closeButton.current.style.display = "block";
      }
    }
  }, [search]);

  // Auto-expand categories that contain the selected category
  useEffect(() => {
    if (selectedCategoryId && !isBooksMode && currentCategoryTree.length > 0) {
      const findParentCategories = (categories, targetId, parents = new Set()) => {
        for (const category of categories) {
          if (category.id === targetId) {
            return parents;
          }
          if (category.children && category.children.length > 0) {
            const newParents = new Set([...parents, category.id]);
            const found = findParentCategories(category.children, targetId, newParents);
            if (found) return found;
          }
        }
        return null;
      };

      const parentIds = findParentCategories(currentCategoryTree, selectedCategoryId);
      if (parentIds) {
        setExpandedCategories(parentIds);
      }
    }
  }, [selectedCategoryId, currentCategoryTree, isBooksMode]);

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Accordion expand/collapse state for books
  const [expandedBookId, setExpandedBookId] = useState(selectedBookId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.search}>
          <span className={`${styles.icon} ${styles.search_icon}`}>
            <SearchIcon />
          </span>
          <span
            className={`${styles.icon} ${styles.close_icon}`}
            onClick={handleClose}
            ref={closeButton}
          >
            <CloseIcon />
          </span>
          <input
            type="text"
            name="search"
            placeholder={isBooksMode ? "Search books and chapters" : "Search categories"}
            className={styles.input}
            autoComplete="off"
            onChange={(e) => filterItems(e.target.value)}
            ref={input}
          />
        </div>
      </div>
      <div className={styles.content}>
        <Scrollbar
          className={styles.category}
          scrollPos={scrollPos}
          id={selectedId}
        >
          <div className={styles.lists}>
            {isBooksMode
              ? currentBooks.map((book, index) => (
                  <BookAccordion
                    key={book.id}
                    book={book}
                    expanded={expandedBookId === book.id}
                    onToggle={() => setExpandedBookId(expandedBookId === book.id ? null : book.id)}
                    selectedBookId={selectedBookId}
                    selectedChapterId={selectedChapterId}
                    allChapters={allChapters}
                  />
                ))
              : currentCategoryTree.map((category, index) => (
                  <CategoryAccordion
                    key={category.id}
                    category={category}
                    expandedCategories={expandedCategories}
                    onToggle={handleCategoryToggle}
                    selectedCategoryId={selectedCategoryId}
                    setScrollPos={setScrollPos}
                    level={0}
                  />
                ))}
          </div>
        </Scrollbar>

        {!isSearchEmpty && (
          <Scrollbar className={styles.category}>
            <div className={styles.lists}>
              {filteredItems && filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  isBooksMode ? (
                    <Link 
                      key={item.id} 
                      href={`/books/${item.id}`} 
                      className={`${styles.list} ${item.id === selectedBookId ? styles.active : ""}`}
                    >
                      <span>{item.title || item.name_en || item.name_ar || `Book ${item.id}`}</span>
                      {item.hadiths_count && (
                        <span className={styles.count}>({item.hadiths_count})</span>
                      )}
                    </Link>
                  ) : (
                    <Link 
                      key={item.id} 
                      href={`/categories/${item.id}/hadiths`} 
                      className={`${styles.list} ${item.id === selectedCategoryId ? styles.active : ""}`}
                    >
                      <span>{item.title || item.name_en || item.name_ar || `Category ${item.id}`}</span>
                      {item.hadiths_count && (
                        <span className={styles.count}>({item.hadiths_count})</span>
                      )}
                    </Link>
                  )
                ))
              ) : (
                <div className={styles.empty}>No records found!</div>
              )}
            </div>
          </Scrollbar>
        )}
      </div>
    </div>
  );
}

// Separate component for Book Accordion
const BookAccordion = ({ book, expanded, onToggle, selectedBookId, selectedChapterId, allChapters }) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onToggle}
      classes={{
        root: styles.acc_root,
        expanded: styles.acc_expanded,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{
          root: styles.summary_root,
          expanded: styles.summary_expanded,
          expandIconWrapper: styles.summary_icon,
          content: styles.summary_content,
        }}
      >
        <Link 
          href={`/books/${book.id}`} 
          className={`${styles.list} ${book.id === selectedBookId ? styles.active : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <span>{book.title || book.name_en || book.name_ar || `Book ${book.id}`}</span>
          {book.hadiths_count && (
            <span className={styles.count}>({book.hadiths_count})</span>
          )}
        </Link>
      </AccordionSummary>
      <AccordionDetails
        classes={{
          root: styles.detail_root,
          expanded: styles.detail_expanded,
        }}
      >
        {allChapters[book.id] && allChapters[book.id].length > 0 && (
          <div className={styles.sub_item}>
            {allChapters[book.id].map((chapter, i) => (
              <Link
                key={chapter.id}
                href={`/books/${book.id}/chapters/${chapter.id}`}
                className={`${styles.list} ${styles.chapter} ${book.id === selectedBookId && chapter.id === selectedChapterId ? styles.active : ""}`}
              >
                <span>{chapter.title || chapter.name_en || chapter.chapter_title || `Chapter ${chapter.id}`}</span>
                {chapter.hadiths_count && (
                  <span className={styles.count}>({chapter.hadiths_count})</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

// Separate component for Category Accordion
const CategoryAccordion = ({ category, expandedCategories, onToggle, selectedCategoryId, setScrollPos, level = 0 }) => {
  const itemRef = useRef(null);
  const hasChildren = category.children && category.children.length > 0;
  const isExpanded = expandedCategories.has(category.id);
  const isSelected = category.id === selectedCategoryId;

  useEffect(() => {
    if (isSelected && itemRef.current) {
      setScrollPos(itemRef.current.offsetTop);
    }
  }, [isSelected, setScrollPos]);

  if (hasChildren) {
    return (
      <Accordion
        expanded={isExpanded}
        onChange={() => onToggle(category.id)}
        classes={{
          root: styles.acc_root,
          expanded: styles.acc_expanded,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: styles.summary_root,
            expanded: styles.summary_expanded,
            expandIconWrapper: styles.summary_icon,
            content: styles.summary_content,
          }}
        >
          <Link
            href={`/categories/${category.id}/hadiths`}
            ref={itemRef}
            className={`${styles.list} ${isSelected ? styles.active : ""} ${styles.parent} ${level === 0 ? styles.root : ""}`}
            onClick={(e) => e.stopPropagation()}
            style={{ paddingLeft: `${5 + (level * 0)}px` }}
          >
            <span>{category.title || category.name_en || category.name_ar || `Category ${category.id}`}</span>
          </Link>
        </AccordionSummary>
        <AccordionDetails
          classes={{
            root: styles.detail_root,
            expanded: styles.detail_expanded,
          }}
        >
          <div className={styles.sub_item}>
            {category.children.map((child) => (
              <CategoryAccordion
                key={child.id}
                category={child}
                expandedCategories={expandedCategories}
                onToggle={onToggle}
                selectedCategoryId={selectedCategoryId}
                setScrollPos={setScrollPos}
                level={level + 1}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    );
  } else {
    return (
      <Link
        href={`/categories/${category.id}/hadiths`}
        ref={itemRef}
        className={`${styles.list} ${isSelected ? styles.active : ""} ${level === 0 ? styles.root : ""}`}
        style={{ paddingLeft: `${0 + (level * 0)}px` }}
      >
        <span>{category.title || category.name_en || category.name_ar || `Category ${category.id}`}</span>
      </Link>
    );
  }
};
