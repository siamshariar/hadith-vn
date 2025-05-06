import { useContext } from "react";
import { PinContext } from "../../contexts/PinContext";
// import { SettingsContext } from "../../contexts/SettingsContext";
import Link from "next/link";
import PinIcon from "../icons/Pin";
import styles from "../pin/list.module.scss";

export default function PinList() {
  const { pin } = useContext(PinContext);

  return (
    <div className={styles.content}>
      <div className={styles.lists}>
        {pin &&
          pin.length > 0 &&
          pin.map((item) => (
            <div key={item.id} className={styles.item}>
              <Link href={`/hadiths/${item.id}`} legacyBehavior>
                <a className={styles.link}>
                  <span className={styles.left}>
                    <span className={styles.icon}>
                      <PinIcon />
                    </span>
                    <span className={styles.desc}>
                      <span>{item.title}</span>
                    </span>
                  </span>
                </a>
              </Link>
            </div>
          ))}
      </div>

      {pin && pin.length == 0 && (
        <h2 className={styles.no_record}>No records found!</h2>
      )}
    </div>
  );
}
