import css from './style.module.scss'
import styles from './about.module.scss'

export default function WIQContent({ page_title }) {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>{page_title}</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <h2>Kinh Quran là gì?</h2>
                    <p>
                        Quran đó là kinh sách được dành cho nhân loại. Nó là một quy tắc hoàn chỉnh của cuộc sống để cho con người áp dụng. Trong đó đã quy định rõ ràng cho việc chúng ta nên làm gì và không nên làm gì.
                    </p>

                    <p>
                        Allah phán rằng, “Nó (Qur'an) không phải là một lời bịa đặt mà là một sự xác nhận những điều đã có trước Nó và là một sự trình bày chi tiết tất cả những sự việ. Và (Nó) là một Chỉ Đạo và một Hồng  n cho đám người có đức tin.” [Chương: Yūsuf, Câu: 111]
                    </p>

                    <p>
                        Nội dung trong thiên kinh Qur'an vẫn không thay đổi trong hơn 1400 năm qua (và cũng không bao giờ bị thay đổi cho đến về sau). Nó bao gồm 114 chương, và mỗi chương sẽ chứa đựng những câu kinh riêng lẻ. Không có một chương hay một câu nào được thay đổi (kể cả cấu trúc hay nội dung ý nghĩa) kể từ khi nó được mặc khải xuống cho Sứ giả Muhammad.
                    </p>

                    <p>
                        Allah phán rằng, “Quả thật, TA đã ban Thông Điệp nhắc nhở (Qur'an) xuống và chính TA sẽ bảo quản Nó.” [Chương: Al-Hijr, Câu: 09]
                    </p>

                    <p>
                        Nó là tập hợp của những lời mặc khải từ thượng đế ALLAH dành cho sứ giả Muhammad trong khoảng thời gian 23 năm nhận sứ mệnh, bắt đầu vào tháng Ramadan khi Muhammad đã 40 tuổi và kết thúc vào năm người 63 tuổi, cũng là lúc người qua đời.
                    </p>

                    <p>
                        Allah phán rằng, “Quả thật, Qur’an này hướng dẫn (nhân loại) đến con đường ngay chính đúng đắn hơn và mang tin mừng cho những người tin tưởng, những ai làm điều thiện, rằng họ sẽ nhận một phần ân thưỏng rất lớn. Và báo cho những ai không tin tưởng nơi đời sau rằng TA đã chuẩn bị sẵn cho chúng một sự trừng phạt đau đớn.” [Chương: Al-Isrā’, Câu: 9-10]
                    </p>
                </div>

                <div>
                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/PUEmgsDF6iw?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Scientific Proof for an Atheist on Existence of God - Dr Zakir Naik</h2>
                    </div>

                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/B-RLIU5FkbM?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>QURAN AND MODERN SCIENCE - LECTURE - DR ZAKIR NAIK</h2>
                    </div>

                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/AUjy0V_q3O8?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Authenticity of the Quran - Dr Zakir Naik</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}
