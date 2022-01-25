import Link from "next/link";
import Image from "next/image";
import Container from "../core/container";
import Grid from "@material-ui/core/Grid";
import EastIcon from "../icons/East";
import styles from "./banner.module.scss";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Container>
        <div className={styles.inner}>
          <q>
            Abu Mūsa al-Ash‘ari (may Allah be pleased with him) reported that
            the Prophet (may Allah's peace and blessings be upon him) said:
            "Keep on reciting the Qur’an, for by the One in Whose Hand my life
            is, the Qur’an slips away from memory faster than camels escaping
            their tying ropes."
          </q>
        </div>
      </Container>
    </div>
  );
}
