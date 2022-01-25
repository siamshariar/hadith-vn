import styles from "./HadithCard.module.scss";

const HadithCard = ({ hadith }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{hadith.title}</h2>
    </div>
  );
};

export default HadithCard;
