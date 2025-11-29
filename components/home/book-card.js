import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Link from "next/link";
import styles from "./book-card.module.scss";
import chaptersData from "../../data/chapters.json";

export default function BookCard({ book, linkToBooksPage = false }) {
  const { verseMode } = useContext(SettingsContext);

  // Get first chapter id for this book
  const chapters = chaptersData[book.id] || [];
  const firstChapterId = chapters.length > 0 ? chapters[0].id : null;
  const href = linkToBooksPage
    ? "/books"
    : firstChapterId
    ? `/books/${book.id}/chapters/${firstChapterId}`
    : `/books/${book.id}`;

  return (
    <div className={styles.item}>
      <Link href={href} className={styles.wrapper}>
        {/* ...existing code... */}
      </Link>
      <span className={styles.number}>{book.id}</span>
      <div className={styles.left}>
        <Link href={href} className={styles.name}>
          {book.name_en || book.name_ar || book.title}
        </Link>
        {/* <div className={styles.bottom}>{book.meaning}</div> */}
      </div>
      {/* <div className={styles.right}>{book.nameArabic}</div> */}
    </div>
  );
}