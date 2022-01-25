import Link from 'next/link'
import NavigateBefore from '../icons/NavigateBefore'
import NavigateNext from '../icons/NavigateNext'
import styles from './pagination.module.scss'

export default function Pagination({ prev, next }) {
    return (
        <div className={styles.wrapper}>

            <div className={styles.prev}>
                {prev !== null && (
                    <Link href={prev.link}>
                        <a className={styles.link}>
                            <span className={styles.icon}><NavigateBefore /></span>
                            <span className={styles.text}>{prev.name}</span>
                        </a>
                    </Link>
                )}
            </div>

            <div className={styles.next}>
                {next !== null && (
                    <Link href={next.link}>
                        <a className={styles.link}>
                            <span className={styles.text}>{next.name}</span>
                            <span className={styles.icon}><NavigateNext /></span>
                        </a>
                    </Link>
                )}
            </div>

        </div>
    )
}