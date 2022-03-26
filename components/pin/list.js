import { useContext } from "react";
import { PinContext } from "../../contexts/PinContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { useRouter } from "next/router";
import PinIcon from "../icons/PinOutline";
import styles from "./list.module.scss";

export default function PinList({ controller }) {
  const { pin } = useContext(PinContext);
  const router = useRouter();

  const handleClick = (e, id) => {
    e.preventDefault();
    controller(false)(e);
    router.push(`/hadiths/${id}`);
  };

  return (
    <div className={styles.content}>
      <div className={styles.lists}>
        {pin &&
          pin.length > 0 &&
          pin.map((item) => (
            <div key={item.id} className={styles.item}>
              <div
                className={styles.link}
                onClick={(e) => handleClick(e, item.id)}
              >
                <div className={styles.left}>
                  <span className={styles.icon}>
                    <PinIcon />
                  </span>
                  <span className={styles.desc}>
                    <span>{item.title}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {pin && pin.length == 0 && (
        <h2 className={styles.no_record}>No records found</h2>
      )}
    </div>
  );
}
