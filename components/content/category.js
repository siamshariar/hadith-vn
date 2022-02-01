import HadithCard from "./HadithCard";
import styles from "./content.module.scss";

export default function CategoryContent({ hadiths, category }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.title_text}>{category.title}</span>
        </div>

        <div className={styles.verses}>
          {hadiths &&
            hadiths.map((hadith, index) => (
              <HadithCard key={index} hadith={hadith} /> // TO DO: update key
            ))}
        </div>

        <div className={styles.print_footer}>
          <span>Vietnamese Hassan</span>
          <span>www.quran.vn</span>
        </div>
      </div>
    </div>
  );
}
