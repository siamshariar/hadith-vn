import styles from "./header.module.scss";
import { useState, useEffect, useRef, useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { SidenavContext } from "../../contexts/SidenavContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "../core/container";
import Modal from "../utils/ModalPrimary";
import Settings from "../settings/index";
import Bookmarks from "../bookmark/list";
import Pin from "../pin/list";
import Brightness4Icon from "../icons/Brightness4";
import Brightness7Icon from "../icons/Brightness7";
import MoreVertIcon from "../icons/MoreVert";
import BookmarkBorderIcon from "../icons/BookmarkBorder";
import InfoIcon from "../icons/Info";
import PinOutlineIcon from "../icons/PinOutline";
import SettingsIcon from "../icons/SettingsOutlined";

export default function HeaderWeb({ page, chapters, isChapterPage }) {
  const router = useRouter();

  const { theme, changeTheme } = useContext(SettingsContext);

  const modeSwitcher = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  const header = useRef(null);
  const [offset, setOffset] = useState(0);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
    if (offset > 5) {
      header.current.classList.add(styles.scrolled);
    } else {
      header.current.classList.remove(styles.scrolled);
    }

    return () => setDidMount(false);
  }, [offset]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleModalClose = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setModalOpen(open);
  };

  const handleItem = (e, item) => {
    e.preventDefault();
    handleClose();

    if (item === "about") {
      router.push("/about");
    } else {
      setModalContent(item);
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className={`${styles.header} ${styles[page]}`} ref={header}>
        <Container>
          <div className={styles.inner}>
            <div className={styles.left}>
              {theme === "light" && (
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

              {theme === "light" && (
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

              {theme !== "light" && (
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
              <IconButton className={styles.btn} onClick={() => modeSwitcher()}>
                {theme === "light" && <Brightness4Icon />}
                {theme !== "light" && <Brightness7Icon />}
              </IconButton>

              <IconButton className={styles.btn} onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                disableScrollLock={true}
              >
                <MenuList className={styles.menu}>
                  <MenuItem
                    onClick={(e) =>
                      handleItem(e, <Bookmarks controller={handleModalClose} />)
                    }
                  >
                    <span className={styles.icon}>
                      <BookmarkBorderIcon />
                    </span>
                    <span className={styles.text}>Bookmarks</span>
                  </MenuItem>

                  <MenuItem onClick={(e) => handleItem(e, <Pin />)}>
                    <span className={styles.icon}>
                      <PinOutlineIcon />
                    </span>
                    <span className={styles.text}>Pin</span>
                  </MenuItem>

                  <MenuItem onClick={(e) => handleItem(e, <Settings />)}>
                    <span className={styles.icon}>
                      <SettingsIcon />
                    </span>
                    <span className={styles.text}>Settings</span>
                  </MenuItem>

                  <MenuItem onClick={(e) => handleItem(e, "about")}>
                    <span className={styles.icon}>
                      <InfoIcon />
                    </span>
                    <span className={styles.text}>About</span>
                  </MenuItem>
                </MenuList>
              </Popover>
            </div>
          </div>
        </Container>
      </div>

      <Modal
        open={modalOpen}
        closer={handleModalClose}
        content={modalContent}
      />
    </>
  );
}
