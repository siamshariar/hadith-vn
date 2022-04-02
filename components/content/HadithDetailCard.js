import { useState, useEffect, useContext, useRef } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { PinContext } from "../../contexts/PinContext";
import Link from "next/link";
import useOnScreen from "../../hooks/useOnScreen";
import HadithOptions from "./HadithOptions";
import styles from "./HadithDetailCard.module.scss";

const HadithCard = ({ hadith, updateBookmarksData, isBookmarkPage }) => {
  // last read option
  const refTarget = useRef();
  const isTargetVisible = useOnScreen(refTarget);
  const { addLastRead } = useContext(PinContext);

  useEffect(() => {
    if (isTargetVisible) {
      addLastRead(hadith);
      // changeActiveVerse(verse.verseNo);
    }
  }, [isTargetVisible]);

  return (
    <div className={styles.wrapper} ref={refTarget}>
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
            updateBookmarksData={updateBookmarksData}
            isBookmarkPage={isBookmarkPage}
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
