import css from "./style.module.scss";
import styles from "./about.module.scss";

export default function IQGWContent({ page_title }) {
  return (
    <div className={css.wrapper}>
      <div className={css.page_title}>{page_title}</div>

      <div className={css.page_item}>
        <div className={styles.quran_content}>
          <h2>Kinh Quran có phải là lời nói của Thượng Đế không?</h2>
          <p>
            The Noble Quran is the eternal miracle of Prophet Muhammad (peace be
            upon him), because all the miracles of the prophets (peace be upon
            them) ended with their death, except our Prophet (peace be upon
            him), whose miracle is still preserved. This everlasting miracle is
            the Book of Allah and His revealed speech that “Không một điều giả
            dối nào có thể xâm nhập Nó (Qur'an) từ đằng trước hay đằng sau.”
            [Chương: Fussilat, Câu: 42]
          </p>

          <p>
            Basically, prophet Muhammad just revealed the verse towards which
            were sent down to him. Here are some reference,
          </p>

          <p>
            Prophet Muhammad (Pbuh) was known to be illiterate, he could neither
            read any previous scriptures nor write the Quran. Allah phán rằng,
            “Và trước Nó (Qur'an), Ngươi đã không hề đọc một Kinh Sách nào và
            cũng không viết được một Kinh Sách nào với tay phải của Ngươi”
            [Chương: Al-‘Ankabūt, Câu: 48]
          </p>

          <p>
            Some of the verses in which addressed the Prophet (PBUH) mention
            some of the things that Allah warned against him, and some of verses
            admonish him: “Và chớ bao giờ nói về một điều gì như sau: “Chắc chắn
            tôi sẽ làm điều đó ngày mai”.Trừ phi (dè dặt nói:) 'Nếu Allah muốn
            như thế'. [Chương: 18, Câu: 23-24]
          </p>

          <p>
            If Quran was authored by human beings, regardless of their knowledge
            and understanding, it should have contradictions, errors, and
            deficiencies.
          </p>

          <p>
            Allah phán rằng, "Tại sao chúng không chịu nghiền ngẫm về Qur’an.
            Nếu là từ một Đấng nào khác Allah thì chắc chắn chúng sẽ tìm thấy
            trong đó nhiều mâu thuẫn." [Chương: An-Nisā’, Câu: 82]
          </p>

          <p>
            Basically in Quran Allah showed us the amazing creatures of him. If
            Muhammad would wrote Quran by himself then he must glorify himself
            by telling his story, his family, etc. But instead of that he just
            narrated what actually Allah told him to do so. And Allah also
            warned him not to tell anything by his own rather than what Allah
            actually told.
          </p>
        </div>

        <div>
          <div className={styles.video_block}>
            <div className={styles.video}>
              <iframe
                src={`https://www.youtube.com/embed/5FbwsNMj_qs?autoplay=0&mute=0`}
              ></iframe>
            </div>
            <h2>100 Proof Quran Is The Word Of God - Dr Zakir Naik</h2>
          </div>

          <div className={styles.video_block}>
            <div className={styles.video}>
              <iframe
                src={`https://www.youtube.com/embed/9RuQMD4yYWg?autoplay=0&mute=0`}
              ></iframe>
            </div>
            <h2>Is the Qur'an God's Word? by Dr Zakir Naik | Full Lecture</h2>
          </div>

          <div className={styles.video_block}>
            <div className={styles.video}>
              <iframe
                src={`https://www.youtube.com/embed/1VJMT77QqB0?autoplay=0&mute=0`}
              ></iframe>
            </div>
            <h2>
              HOW TO PROVE TO AN ATHEIST THAT THE QUR'AN IS GOD'S WORD? PART - 1
              | DR ZAKIR NAIK
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
