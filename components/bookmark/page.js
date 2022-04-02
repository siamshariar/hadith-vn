import { useContext } from "react";
import { BookmarkContext } from "../../contexts/BookmarkContext";
import HadithCard from "../content/HadithDetailCard";
import Skeleton from "react-loading-skeleton";
import styles from "./page.module.scss";

export default function BookmarkContent({
  name,
  data,
  exist,
  isBookmarkPage,
  queryKey,
  updateBookmarksData,
}) {
  const { bookmarks } = useContext(BookmarkContext);

  console.log(data);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>
          {name && <span className={styles.title_text}>{name}</span>}
          {name === null && <Skeleton height={29} width={`100%`} />}
        </div>

        {bookmarks && bookmarks.hasOwnProperty(queryKey) && (
          <div className={styles.items}>
            {data.length > 0 &&
              data.map((item) => (
                <div className={styles.item}>
                  <HadithCard
                    key={item.id}
                    hadith={item}
                    isBookmarkPage={isBookmarkPage}
                    updateBookmarksData={updateBookmarksData}
                  />
                </div>
              ))}
          </div>
        )}

        {!bookmarks && !exist && (
          <div className={styles.no_record}>No records found!</div>
        )}

        {!bookmarks && exist && (
          <Skeleton height={150} width={`100%`} count={2} />
        )}
      </div>
    </div>
  );
}
