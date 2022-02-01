import { generateCategoryTree } from "../../lib/functions";

import { useState, useRef, useContext, useEffect } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Link from "next/link";
import Scrollbar from "../core/scrollbar";
import CloseIcon from "../icons/Close";
import SearchIcon from "../icons/Search";
import styles from "./index.module.scss";

import { AccordionSummary } from "@material-ui/core";

export default function ChapterList({ categories }) {
  // const { verseMode } = useContext(SettingsContext);

  const [chapters, setChapters] = useState([]);

  const filterChapters = (search) => {
    const filtered = categories.filter((chapter) => {
      return (
        chapter.title.toLowerCase().includes(search.toLowerCase()) ||
        chapter.id.toString().includes(search)
      );
    });
    setChapters(filtered);
  };

  const input = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (open) {
      input.current.focus();
    } else {
      setChapters(categories);
      input.current.value = "";
    }
    setSearchOpen(open);
  };

  // useEffect(() => {
  //   setChapters(generateCategoryTree(categories));
  // }, []);

  // console.log(categories);

  return (
    <Scrollbar className={styles.sidenav}>
      <div className={styles.wrapper}>
        {/* <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.title}>
              <h2>Chương</h2>
            </div>
          </div>

          <div className={styles.right}>
            <span className={styles.icon} onClick={handleSearchOpen(true)}>
              <SearchIcon />
            </span>
            <span className={styles.icon} onClick={controller(false)}>
              <CloseIcon />
            </span>
          </div>

          <div
            className={
              searchOpen ? `${styles.search} ${styles.open}` : styles.search
            }
          >
            <input
              type="text"
              name="chapter-search"
              placeholder="Search Chapter"
              onChange={(e) => filterChapters(e.target.value)}
              ref={input}
            />
            <span onClick={handleSearchOpen(false)}>
              <CloseIcon />
            </span>
          </div>
        </div> */}

        <div className={styles.lists}>
          {categories.map((chapter, index) => {
            const depthLevel = 0;
            return (
              <ListItem items={chapter} key={index} depthLevel={depthLevel} />
            );
          })}
        </div>
      </div>
    </Scrollbar>
  );
}

const ListItem = ({ items, depthLevel }) => {
  return (
    <>
      <Link href={`/categories/${items.id}/hadiths`}>
        <a
          className={`${styles.list} level${depthLevel} ${
            items.parent_id == null ? styles.parent : null
          }`}
        >
          <div className={styles.name}>
            <span>
              {items.id} {items.title}
            </span>
          </div>
        </a>
      </Link>
      {items.children &&
        items.children.length &&
        items.children.map((item, index) => {
          const level = depthLevel + 1;
          return <ListItem items={item} key={index} depthLevel={level} />;
        })}
    </>
  );
};
