import Link from 'next/link'
import Image from 'next/image'
import Container from '../../core/container'
import Grid from '@material-ui/core/Grid'
import EastIcon from '../../icons/East'
import styles from './banner.module.scss'

export default function Banner() {
    return (
        <>
            <div className={styles.banner}>
                <Container>
                    {/*<div className={styles.calligraphy}>*/}
                    {/*    <Image*/}
                    {/*        src="/img/quran.webp"*/}
                    {/*        alt=""*/}
                    {/*        width={300}*/}
                    {/*        height={170}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className={styles.grid}>
                        <Grid container spacing={4}>
                            <GridItem
                                title="Kinh Quran là gì?"
                                text="Quran đó là kinh sách được dành cho nhân loại. Nó là một quy tắc hoàn chỉnh của cuộc sống để cho con người áp dụng."
                                url="/kinh-quran-la-gi"
                            />
                            <GridItem
                                title="Kinh Quran có phải là lời nói của Thượng Đế không?"
                                text="Không một điều giả dối nào có thể xâm nhập Nó (Qur'an) từ đằng trước hay đằng sau."
                                url="/kinh-quran-co-phai-la-loi-noi-cua-thuong-de-khong"
                            />
                            <GridItem
                                title="Tại sao chúng ta phải nên đọc Kinh Quran?"
                                text="Tháng Ramadan là tháng trong đó (Kinh) Qur’an được ban xuống làm Chỉ Đạo cho nhân loại và mang bằng chứng rõ..."
                                url="/tai-sao-chung-ta-phai-nen-doc-kinh-quran"
                            />
                        </Grid>
                    </div>
                </Container>
            </div>

            {/*<div className={styles.banner_mobile}>*/}
            {/*    <Container>*/}
            {/*        <Link href="/about-quran">*/}
            {/*            <a className={styles.banner_link}>Know more about Quran</a>*/}
            {/*        </Link>*/}
            {/*    </Container>*/}
            {/*</div>*/}
        </>
    )
}


const GridItem = ({ title, text, url }) => {
    return (
        <Grid item xs={12} md={4}>
            <div className={styles.grid_item}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.text}>{text}</p>
                <Link href={url}>
                    <a className={styles.link}>
                        <span className={styles.link_text}>Xem thêm</span>
                        <span className={styles.link_icon}><EastIcon /></span>
                    </a>
                </Link>
            </div>
        </Grid>
    )
}