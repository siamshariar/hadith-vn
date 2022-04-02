import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Scrollbar from "../core/scrollbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "../icons/Search";
import styles from "./index.module.scss";

export default function Sidebar({
  categoryList,
  categoryTree,
  selectedCategoryId,
}) {
  // categories without tree
  const input = useRef(null);
  const closeButton = useRef(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);

  const filterCategories = (search) => {
    setSearch(search);
    const filtered = categoryList.filter((item) => {
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toString().includes(search)
      );
    });
    setCategoryItems(filtered);
  };

  const handleClose = () => {
    setSearch("");
    input.current.value = "";
  };

  useEffect(() => {
    if (search === "") {
      setIsSearchEmpty(true);
      closeButton.current.style.display = "none";
    } else {
      setIsSearchEmpty(false);
      closeButton.current.style.display = "block";
    }
  }, [search]);

  const [scrollPos, setScrollPos] = useState(0);
  const [isScrollPosCalculationDone, setIsScrollPosCalculationDone] =
    useState(false);

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
            placeholder="Search Category"
            className={styles.input}
            onChange={(e) => filterCategories(e.target.value)}
            ref={input}
          />
        </div>
      </div>
      <div className={styles.content}>
        <Scrollbar
          className={styles.category}
          scrollPos={scrollPos}
          key={selectedCategoryId}
          id={selectedCategoryId}
        >
          <div className={styles.lists}>
            {categoryTree &&
              categoryTree.map((cat, index) => {
                return (
                  <ListItem
                    items={cat}
                    key={index}
                    selectedCategory={selectedCategoryId}
                    scrollPos={scrollPos}
                    setScrollPos={setScrollPos}
                    isScrollPosCalculationDone={isScrollPosCalculationDone}
                    setIsScrollPosCalculationDone={
                      setIsScrollPosCalculationDone
                    }
                  />
                );
              })}
          </div>
        </Scrollbar>

        {!isSearchEmpty && (
          <Scrollbar className={styles.category}>
            <div className={styles.lists}>
              {categoryItems &&
                categoryItems.length > 0 &&
                categoryItems.map((items, index) => (
                  <Link key={index} href={`/categories/${items.id}/hadiths`}>
                    <a className={`${styles.list}`}>
                      <span>{items.title}</span>
                    </a>
                  </Link>

                  // <NormalList
                  //   items={cat}
                  //   key={index}
                  //   selectedCategory={selectedCategoryId}
                  //   scrollPos={scrollPos}
                  //   setScrollPos={setScrollPos}
                  //   isScrollPosCalculationDone={isScrollPosCalculationDone}
                  //   setIsScrollPosCalculationDone={
                  //     setIsScrollPosCalculationDone
                  //   }
                  // />
                ))}

              {categoryItems && !categoryItems.length && (
                <h2 className={styles.empty}>No record found!</h2>
              )}
            </div>
          </Scrollbar>
        )}
      </div>
    </div>
  );
}

const ListItem = ({
  items,
  selectedCategory,
  scrollPos,
  setScrollPos,
  isScrollPosCalculationDone,
  setIsScrollPosCalculationDone,
}) => {
  const [expanded, setExpanded] = useState(true);
  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  // const fieldRef = useRef(null);

  const [newPos, setNewPos] = useState(scrollPos);

  useEffect(() => {
    if (items.id == selectedCategory) {
      setScrollPos(document.getElementById(`navitem-${items.id}`).offsetTop);
    }
  }, [selectedCategory]);

  if (items.children && items.children.length > 0) {
    return (
      <Accordion
        expanded={expanded}
        classes={{
          root: styles.acc_root,
          expanded: styles.acc_expanded,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => toggleAccordion()} />}
          classes={{
            root: styles.summary_root,
            expanded: styles.summary_expanded,
            expandIconWrapper: styles.summary_icon,
            content: styles.summary_content,
          }}
        >
          <Link href={`/categories/${items.id}/hadiths`}>
            <a
              id={`navitem-${items.id}`}
              className={`${styles.list} ${
                items.id == selectedCategory ? styles.active : ""
              } ${
                items.children && items.children.length ? styles.parent : ""
              } ${items.parent_id == null ? styles.root : ""}`}
              // ref={fieldRef}
            >
              <span>{items.title}</span>
            </a>
          </Link>
        </AccordionSummary>
        {items.children && items.children.length > 0
          ? items.children.map((item, index) => (
              <div className={styles.sub_item} key={`sub-${index}`}>
                <AccordionDetails
                  classes={{
                    root: styles.detail_root,
                    expanded: styles.detail_expanded,
                  }}
                >
                  <ListItem
                    items={item}
                    key={index}
                    selectedCategory={selectedCategory}
                    scrollPos={newPos}
                    setScrollPos={setScrollPos}
                    isScrollPosCalculationDone={isScrollPosCalculationDone}
                    setIsScrollPosCalculationDone={
                      setIsScrollPosCalculationDone
                    }
                  />
                </AccordionDetails>
              </div>
            ))
          : null}
      </Accordion>
    );
  } else {
    return (
      <Link href={`/categories/${items.id}/hadiths`}>
        <a
          id={`navitem-${items.id}`}
          className={`${styles.list} ${
            items.id == selectedCategory ? styles.active : ""
          } ${items.children && items.children.length ? styles.parent : ""} ${
            items.parent_id == null ? styles.root : ""
          }`}
        >
          <span>{items.title}</span>
        </a>
      </Link>
    );
  }
};
