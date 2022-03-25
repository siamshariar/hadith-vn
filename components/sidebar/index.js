import { useState, useRef } from "react";
import Link from "next/link";
import Scrollbar from "../core/scrollbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "../icons/Search";
import styles from "./index.module.scss";

export default function Sidebar({ categoriesTree, categories }) {
  const [categoryItems, setCategoryItems] = useState([]);

  const filterCategories = (search) => {
    const filtered = categories.filter((item) => {
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toString().includes(search)
      );
    });
    setCategoryItems(filtered);
  };

  const input = useRef(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.search}>
          <span className={styles.icon}>
            <SearchIcon />
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

      <Scrollbar className={styles.category}>
        {/* <div className={styles.title}>
          <h2>Categories</h2>
        </div> */}

        <div className={styles.lists}>
          {categories.map((cat, index) => {
            return <ListItem items={cat} key={index} />;
          })}
        </div>
      </Scrollbar>
    </div>
  );
}

const ListItem = ({ items }) => {
  const [expanded, setExpanded] = useState(`panel-${items.id}`);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (items.children && items.children.length > 0) {
    return (
      <Accordion
        expanded={expanded === `panel-${items.id}`}
        onChange={handleChange(`panel-${items.id}`)}
        classes={{
          root: styles.acc_root,
          expanded: styles.acc_expanded,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          // aria-controls="panel1a-content"
          // id="panel1a-header"
          classes={{
            root: styles.summary_root,
            expanded: styles.summary_expanded,
            expandIconWrapper: styles.summary_icon,
            content: styles.summary_content,
          }}
        >
          <Link href={`/categories/${items.id}/hadiths`}>
            <a
              className={`${styles.list} ${
                items.parent_id == null ? styles.parent : null
              }`}
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
                  <ListItem items={item} key={index} />
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
          className={`${styles.list} ${
            items.parent_id == null ? styles.parent : null
          }`}
        >
          <span>{items.title}</span>
        </a>
      </Link>
    );
  }
};
