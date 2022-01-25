import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Link from "next/link";
import styles from "./category-card.module.scss";

export default function CategoryCard({ category }) {
  const { verseMode } = useContext(SettingsContext);

  // const link =
  //   verseMode === "scroll"
  //     ? `/chapters/${category.slug}`
  //     : verseMode === "slide"
  //     ? `/chapters/${category.slug}/verses/1`
  //     : `/chapters/${category.slug}`;

  return (
    <div className={styles.item}>
      <Link href={`categories/${category.id}`}>
        <a className={styles.wrapper}></a>
      </Link>

      <span className={styles.number}>{category.id}</span>

      <div className={styles.left}>
        <Link href={`categories/${category.id}`}>
          <a className={styles.name}>{category.title}</a>
        </Link>
        <div className={styles.bottom}>{category.meaning}</div>
      </div>

      <div className={styles.right}>{category.nameArabic}</div>
    </div>
  );
}
