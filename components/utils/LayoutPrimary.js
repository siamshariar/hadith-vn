import HeaderWeb from "../web/header";
import HeaderMobile from "../mobile/header-chapter";
import FooterWeb from "../web/footer";
import Sidebar from "../sidebar";
import CategoryContent from "../content/category";
import ArabicDialog from "../core/arabic-dialog";
import AudioPlayer from "../surah/audio-player";

import SettingsContextProvider from "../../contexts/SettingsContext";
import AudioPlayerContextProvider from "../../contexts/AudioPlayerContext";
import PinContextProvider from "../../contexts/PinContext";
import BookmarkContextProvider from "../../contexts/BookmarkContext";
import SidenavContextProvider from "../../contexts/SidenavContext";

import styles from "./Layout.module.scss";
import Meta from "../core/meta";

const Layout = ({ meta, categories, hadiths, contentTitle, content }) => {
  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <SidenavContextProvider>
            <AudioPlayerContextProvider>
              <Meta
                title={meta.title}
                description={meta.description}
                url={meta.url}
                image={meta.image}
                type={meta.type}
              />

              <ArabicDialog />

              <AudioPlayer />

              <div className={styles.wrapper}>
                <div className={styles.header}>
                  <HeaderWeb
                    page="surah"
                    chapters={categories}
                    isChapterPage={true}
                  />
                  <HeaderMobile
                    contentTitle={contentTitle}
                    chapterNo={contentTitle}
                    chapters={categories}
                  />
                </div>

                <div className={styles.body}>
                  <div className={styles.sidebar}>
                    <Sidebar categories={categories} />
                  </div>
                  <main id="viewport" className={styles.content}>
                    <div className={styles.container}>{content}</div>
                  </main>
                </div>

                <div className={styles.footer}>
                  <FooterWeb />
                </div>
              </div>
            </AudioPlayerContextProvider>
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
};

export default Layout;
