import { useState } from "react";
import { useRouter } from "next/router";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Container from "../core/container";
// import GoToVerse from './go-to-verse'
import MenuBookIcon from "../icons/MenuBook";
// import NearMeIcon from '../icons/NearMe'
// import FavoriteIcon from '../icons/Favorite'
// import SubtitlesIcon from '../icons/Subtitles'
// import LinkIcon from '../icons/Link'
import InfoIcon from "../icons/Info";
import BookmarkIcon from "../icons/BookmarkBorder";
import styles from "./Footer.module.scss";

import SubjectIcon from "@material-ui/icons/Subject";

export default function FooterMobile() {
  const router = useRouter();

  const handleRouting = (href) => {
    router.push(href);
  };

  const [value, setValue] = useState(router.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const [goToVerseOpen, setGoToVerseOpen] = useState(false)
  // const [goToVerseInit, setGoToVerseInit] = useState(false)
  // const [goToVerseData, setGoToVerseData] = useState([])

  // const handleGoToVerseModal = open => event => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return
  //   }

  //   setGoToVerseOpen(open)

  //   if (!goToVerseInit) {
  //       getChaptersInfo().then(res => {
  //           setGoToVerseData(res)

  //           setTimeout(() => {
  //               setGoToVerseInit(true)
  //           }, 0)
  //       })
  //   }
  // }

  return (
    <>
      <div className={styles.footer}>
        <Container>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={styles.inner}
          >
            <BottomNavigationAction
              label="Chương"
              value="/"
              icon={<MenuBookIcon />}
              onClick={() => handleRouting("/")}
            />

            <BottomNavigationAction
              label="Biết thêm về"
              value="/about-quran"
              icon={<InfoIcon />}
              onClick={() => handleRouting("/about-quran")}
            />

            <BottomNavigationAction
              label="Bookmarks"
              value="/bookmarks"
              icon={<BookmarkIcon />}
              onClick={() => handleRouting("/bookmarks")}
            />

            {/* <BottomNavigationAction
                            label="Đi đến"
                            value="verse"
                            icon={<NearMeIcon />}
                            onClick={handleGoToVerseModal(true)}
                        /> */}

            <BottomNavigationAction
              label="Chủ đề liên"
              value="/subjective"
              icon={<SubjectIcon />}
              onClick={() => handleRouting("/subjective")}
            />

            {/*<BottomNavigationAction*/}
            {/*    label="Bookmark"*/}
            {/*    value="bookmark"*/}
            {/*    icon={<FavoriteIcon />}*/}
            {/*/>*/}

            {/* <BottomNavigationAction
                            label="Pin"
                            value="pin"
                            icon={<LinkIcon />}
                        /> */}
          </BottomNavigation>
        </Container>
      </div>

      {/* <GoToVerse
                open={goToVerseOpen}
                controller={handleGoToVerseModal}
                init={goToVerseInit}
                data={goToVerseData}
            /> */}
    </>
  );
}
