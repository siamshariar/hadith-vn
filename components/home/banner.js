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
            Ông Abu Umamah Sudai bin 'Ujlan Al-Bahili thuật lại: Tôi nghe được Thiên Sứ của Allah ﷺ
            thuyết giảng trong chuyến hành hương Hajj chia tay, Người nói: Các ngươi hãy kính sợ Allah mà dâng lễ
            nguyên Salah năm lần bắt buộc, nhịn chay tháng bắt buộc của các ngươi, xuất Zakat từ tài sản của các
            ngươi và tuân lệnh lãnh đạo của các ngươi, các ngươi sẽ được vào Thiên Đàng của Thượng Đế của các ngươi
          </q>
          <span>[Do Al-Tirmizdi ghi - Do Ahmad ghi]</span>
        </div>
      </Container>
    </div>
  );
}
