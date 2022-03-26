import Link from "next/link";
import styles from "./HadithDetailCard.module.scss";
import HadithOptions from "./HadithOptions";

const HadithCard = ({ hadith }) => {
  console.log(hadith);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title_area}>
        <div className={styles.left}>
          <h1>{hadith.title}</h1>
        </div>
        <div className={styles.right}>
          <HadithOptions
            // index={hadith.id}
            // chapterNumber="1"
            // chapterName={null}
            // chapterSlug={null}
            // verseNumber={null}
            // ayaArabic={null}
            // translation={null}
            // footnotes={null}
            // printRef={null}
            updateBookmarksData={null}
            isBookmarkPage={null}
            hadith={hadith}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={`${styles.item} ${styles.trans}`}>
          <p>
            <span>Translation: </span>
            {hadith.hadeeth}
          </p>
        </div>

        <div className={`${styles.item} ${styles.attr}`}>
          <p>
            <span>Attribution: </span>
            {hadith.attribution}
          </p>
        </div>

        <div className={`${styles.item} ${styles.grade}`}>
          <p>
            <span>Grade: </span>
            {hadith.grade}
          </p>
        </div>

        <div className={`${styles.item} ${styles.exp}`}>
          <p>
            <span>Explanation: </span>
            {hadith.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HadithCard;
