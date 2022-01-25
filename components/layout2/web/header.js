import GoToVerse from '../../mobile/go-to-verse'
import { useContext } from 'react'
import { SettingsContext } from '../../../contexts/SettingsContext'
import { SidenavContext } from '../../../contexts/SidenavContext'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Container from '../../core/container'
import Brightness4Icon from '../../icons/Brightness4'
import Brightness7Icon from '../../icons/Brightness7'
import MoreVertIcon from '../../icons/MoreVert'
import NearMeIcon from '../../icons/NearMeOutlined'
import SubtitlesIcon from '../../icons/SubtitlesOutlined'
import FavoriteBorderIcon from '../../icons/FavoriteBorder'
import BookmarkBorderIcon from '../../icons/BookmarkBorder'
import DownloadIcon from '../../icons/FileDownload'
import InfoIcon from '../../icons/Info'
import PinOutlineIcon from '../../icons/PinOutline'
import AutoStoriesIcon from '../../icons/AutoStories'
import SettingsIcon from '../../icons/SettingsOutlined'
import styles from './header.module.scss'
import Names99Icon from "../../icons/Names99";

export default function HeaderWeb({ page, chapters, isChapterPage }) {
  const { bookmarkOpen, changeBookmarkOpen } = useContext(SidenavContext);
  const router = useRouter()

  const handleSidenav = (e, tab) => {
    e.preventDefault()
    handleClose()
    if (!isChapterPage) {
      changeBookmarkOpen(tab)
      router.push(`/chapters/1-chương-al-fātihah`)
      return;
    }
    changeBookmarkOpen(tab)
  }

    const { theme, changeTheme } = useContext(SettingsContext)

    const modeSwitcher = () => {
        const newTheme = (theme === 'light') ? 'dark' : 'light'
        changeTheme(newTheme)
    }

    const header = useRef(null)
    const [offset, setOffset] = useState(0)
    const [didMount, setDidMount] = useState(false)

    useEffect(() => {
        setDidMount(true)

        window.onscroll = () => {
            setOffset(window.pageYOffset)
        }
        if (offset > 5) {
            header.current.classList.add(styles.scrolled)
        }
        else {
            header.current.classList.remove(styles.scrolled)
        }

        return () => setDidMount(false)
    }, [offset])


    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)


    // go to verse option
    const [goToVerseOpen, setGoToVerseOpen] = useState(false)
    // const [goToVerseInit, setGoToVerseInit] = useState(false)
    // const [goToVerseData, setGoToVerseData] = useState([])

    const handleGoToVerseModal = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}

        handleClose()

		setGoToVerseOpen(open)

        // if (!goToVerseInit) {
        //     getChaptersInfo().then(res => {
        //         setGoToVerseData(res)

        //         setTimeout(() => {
        //             setGoToVerseInit(true)
        //         }, 0)
        //     })
        // }
	}

    return (
        <>
            <div className={`${styles.header} ${styles[page]}`} ref={header}>
                <Container>
                    <div className={styles.inner}>
                        <div className={styles.left}>
                            {theme === 'light' && (
                                <Link href="/">
                                    <a className={`${styles.logo} ${styles.logo_normal}`}>
                                        <Image
                                            src="/img/logo.png"
                                            alt=""
                                            width={122}
                                            height={26}
                                            loading="eager"
                                        />
                                    </a>
                                </Link>
                            )}

                            {theme === 'light' && (
                                <Link href="/">
                                    <a className={`${styles.logo} ${styles.logo_white}`}>
                                        <Image
                                            src="/img/logo_full_white.png"
                                            alt=""
                                            width={122}
                                            height={26}
                                            loading="eager"
                                        />
                                    </a>
                                </Link>
                            )}

                            {theme !== 'light' && (
                                <Link href="/">
                                    <a className={`${styles.logo} ${styles.logo_full_white}`}>
                                        <Image
                                            src="/img/logo_full_white.png"
                                            alt=""
                                            width={122}
                                            height={26}
                                            loading="eager"
                                        />
                                    </a>
                                </Link>
                            )}
                        </div>

                        <div className={styles.right}>
                            <IconButton
                                className={styles.btn}
                                onClick={() => modeSwitcher()}
                            >
                                {theme === 'light' && <Brightness4Icon />}
                                {theme !== 'light' && <Brightness7Icon />}
                            </IconButton>

                            <IconButton
                                className={styles.btn}
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>

                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                disableScrollLock={true}
                            >
                                <MenuList className={styles.menu}>
                                    <MenuItem
                                        onClick={handleGoToVerseModal(true)}
                                    >
                                        <span className={styles.icon}><NearMeIcon /></span>
                                        <span className={styles.text}>Go To Verse</span>
                                    </MenuItem>
                                    <Link href="/names-of-allah">
                                        <MenuItem onClick={handleClose}>
                                            <a className={styles.link}>
                                                <span className={styles.icon}><Names99Icon /></span>
                                                <span className={styles.text}>Names of Allah</span>
                                            </a>
                                        </MenuItem>
                                    </Link>
                                    <Link href="/subjective">
                                        <MenuItem onClick={handleClose}>
                                            <a className={styles.link}>
                                                <span className={styles.icon}><SubtitlesIcon /></span>
                                                <span className={styles.text}>Subjective</span>
                                            </a>
                                        </MenuItem>
                                    </Link>

                                    <Link href="/bookmark">
                                        <MenuItem
                                          onClick={e => handleSidenav(e, 1)}
                                        >
                                            <a className={styles.link}>
                                                <span className={styles.icon}><BookmarkBorderIcon /></span>
                                                <span className={styles.text}>Bookmark</span>
                                            </a>
                                        </MenuItem>
                                    </Link>
                                    <Link href="/bookmark">
                                        <MenuItem
                                          onClick={e => handleSidenav(e, 2)}
                                        >
                                            <a className={styles.link}>
                                                <span className={styles.icon}><PinOutlineIcon /></span>
                                                <span className={styles.text}>Pin</span>
                                            </a>
                                        </MenuItem>
                                    </Link>
                                    <Link href="/bookmark">
                                        <MenuItem
                                          onClick={e => handleSidenav(e, 3)}
                                        >
                                            <a className={styles.link}>
                                                <span className={styles.icon}><AutoStoriesIcon /></span>
                                                <span className={styles.text}>Last Read</span>
                                            </a>
                                        </MenuItem>
                                    </Link>
                                    <Link href="/download">
                                        <MenuItem onClick={handleClose}>
                                            <a className={styles.link}>
                                                <span className={styles.icon}><DownloadIcon /></span>
                                                <span className={styles.text}>Download</span>
                                            </a>
                                        </MenuItem>
                                    </Link>
                                    <Link href="/about">
                                        <MenuItem onClick={handleClose}>
                                            <a className={styles.link}>
                                                <span className={styles.icon}><InfoIcon /></span>
                                                <span className={styles.text}>About</span>
                                            </a>
                                        </MenuItem>
                                    </Link>
                                    {/*<MenuItem onClick={handleClose}>*/}
                                    {/*    <span className={styles.icon}><SettingsIcon /></span>*/}
                                    {/*    <span className={styles.text}>Settings</span>*/}
                                    {/*</MenuItem>*/}
                                </MenuList>
                            </Popover>
                        </div>
                    </div>
                </Container>
            </div>

            <GoToVerse
                open={goToVerseOpen}
                controller={handleGoToVerseModal}
                chapters={chapters}
            />
        </>
    )
}