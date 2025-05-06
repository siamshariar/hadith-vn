import Link from "next/link";
import Container from "../core/container";
import styles from "./Footer.module.scss";

export default function FooterWeb() {
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            <span>&copy; {new Date().getFullYear()} </span>
            <Link href="/about" legacyBehavior>
              <a>Hadith.vn</a>
            </Link>
            <span> All Rights Reserved</span>
          </p>

          <ul className={styles.menu}>
            <li>
              <Link href="/support" legacyBehavior>
                <a>Support</a>
              </Link>
            </li>
            <li>
              <Link href="/grateful" legacyBehavior>
                <a>Grateful</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a>Contact</a>
              </Link>
            </li>
          </ul>

          <p className={styles.credit}>
            Powered By -{" "}
            <a href="http://deeniinfotech.com/" target="_blank">
              Deeni Info Tech
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
