import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Link from "next/link";
import styles from "./category-card.module.scss";

export default function CategoryCard({ category }) {
  const { verseMode } = useContext(SettingsContext);

  const link = category.book_id
    ? `/books/${category.book_id}/chapters/${category.id}`
    : `/categories/${category.id}/hadiths`;

  return (
    <div className={styles.item}>
      <Link href={link} className={styles.wrapper}>

      </Link>
      <span className={styles.number}>{category.chapter_no || category.id}</span>
      <div className={styles.left}>
        <Link href={link} className={styles.name}>
          {category.name_en || category.title}
        </Link>
        {/* <div className={styles.bottom}>{category.meaning}</div> */}
      </div>
      {/* <div className={styles.right}>{category.nameArabic}</div> */}
    </div>
  );
}
