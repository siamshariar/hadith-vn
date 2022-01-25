import css from './style.module.scss'
import styles from './about.module.scss'

export default function WNTRQContent({ page_title }) {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>{page_title}</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <h2>Tại sao chúng ta phải nên đọc Kinh Quran?</h2>
                    <p>
                        The first revelation of the Holy Qur’an that was revealed to Prophet Muhammad (pbuh) was ‘Read’ ‘اقرا’ from (Surah Alaq verse 1) which shows the importance of acquiring knowledge by reading.
                    </p>

                    <p>
                        Allah phán rằng, “Tháng Ramadan là tháng trong đó (Kinh) Qur’an được ban xuống làm Chỉ Đạo cho nhân loại và mang bằng chứng rõ rệt về Chỉ Đạo và Tiêu chuẩn (phân biệt Phúc và Tội)” (Chương: Al-Baqarah, Câu:185)
                    </p>

                    <p>
                        The Quran describes itself as a book of guidance for mankind (Chương: Al-Baqarah, Câu:185).
                    </p>

                    <p>
                        It is a source of Guidance. Quran reading will help you to find direction or guidance in life. Allah Almighty has promised mankind that the effect of reading and understanding the Quran is to: “đưa nhân loại từ tăm tối ra ánh sáng (Chương: Ibrāhīm, Câu:1) and “hướng dẫn họ theo con đường ngay chính.” (Chương: Al-Mā’idah, Câu:16)
                    </p>

                    <p>
                        It is an Intercessor for the Day of Judgment. “Recite the Quran for it will come as an intercessor for its people on the Day of Judgement” (Muslim)
                    </p>

                    <p>
                        It Teaches about the Purpose of Existence. In the Holy Quran, Allah phán rằng: “Đấng đã tạo sự chết và sự sống để thử thách ai trong các ngươi là người tốt nhất trong việc làm của mình” (Chương: Al-Mulk, Câu:2)
                    </p>

                    <p>
                        It Fills our Heart and Removes illness from the Heart. Allah phán rằng in the Quran: “Hỡi nhân loại! Một lời khuyên bảo tốt (Qur’an) từ Thượng Đế (Allah) của các ngươi đã đến với các ngươi; và là một phương thức chữa lành (những căn bệnh) trong lòng của các ngươi; vừa là một Chỉ Đạo và một Hồng  n cho những người có đức tin.” (Chương: Yūnus, Câu:57)
                    </p>

                    <p>
                        Reciting and reflecting over the Quran has tremendous benefits as The Holy Quran is the book of guidance for all mankind till the Day of Judgment. Muslims needs to practice the teachings of the Holy Quran in their lives. The Quran is not a book like any other, it is a timeless guide for life, death and the hereafter life.
                    </p>
                </div>

                <div>
                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/uZaHPz7OVbQ?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Miracles of Quran By Dr Zakir Naik</h2>
                    </div>

                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/ocCdBbfSk8Q?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Quran : The Path Of Happiness - Dr Zakir Naik</h2>
                    </div>

                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/rUf9i79u7vI?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Dr Zakir Naik Scientifically & Logically Proves to an Atheist the Existence of Hell & Heaven</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
