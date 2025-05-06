import Link from "next/link";
import styles from "./HadithCard.module.scss";

const HadithCard = ({ hadith }) => {
  return (
    <div className={styles.wrapper}>
      <Link href={`/hadiths/${hadith.id}`} legacyBehavior>
        <a className={styles.title}>{hadith.title}</a>
      </Link>
    </div>
  );
};

export default HadithCard;
