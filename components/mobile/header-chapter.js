import { useState, useRef } from "react";
import Link from "next/link";
import Container from "../core/container";
import CategoryModal from "./CategoryModal";
import SettingsModal from "./settings-modal";
import BackIcon from "../icons/NavigateBefore";
import DropDownIcon from "../icons/ArrowDropDown";
import TuneIcon from "../icons/Tune";
import styles from "./header.module.scss";

export default function HeaderMobile({ contentTitle, categories }) {
  const [goToVerseOpen, setGoToVerseOpen] = useState(false);

  const handleGoToVerseModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setGoToVerseOpen(open);
  };

  // settings modal
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsModal = (open) => (event) => {
    event.preventDefault();
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSettingsOpen(open);
  };

  // show hide appbar on scroll
  const header = useRef(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [didMount, setDidMount] = useState(false);

  // useEffect(() => {
  //     setDidMount(true)
  //
  //     const viewport = document.getElementById('viewport')
  //
  //     viewport.onscroll = () => {
  //         setScrollTop(viewport.scrollTop)
  //     }
  //     if (scrollTop > lastScrollTop) {
  //         header.current.classList.add(styles.scroll_up)
  //     }
  //     else {
  //         header.current.classList.remove(styles.scroll_up)
  //     }
  //     setLastScrollTop(scrollTop)
  //
  //     return () => setDidMount(false)
  // }, [scrollTop])

  return (
    <>
      <div className={styles.header} ref={header}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <Link href="/">
                <a className={styles.icon}>
                  <BackIcon />
                </a>
              </Link>
            </div>

            <div className={styles.center} onClick={handleGoToVerseModal(true)}>
              {/* <span>{chapterNo}. </span> */}
              <span>{contentTitle} </span>
              <span className={styles.icon}>
                <DropDownIcon />
              </span>
            </div>

            <div className={styles.right}>
              <Link href="/settings">
                <a className={styles.icon} onClick={handleSettingsModal(true)}>
                  <TuneIcon />
                </a>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <CategoryModal
        open={goToVerseOpen}
        controller={handleGoToVerseModal}
        categories={categories}
      />

      <SettingsModal open={settingsOpen} controller={handleSettingsModal} />
    </>
  );
}
