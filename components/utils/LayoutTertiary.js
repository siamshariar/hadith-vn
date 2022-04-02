import Meta from "../core/meta";
import HeaderWeb from "../web/Header";
import HeaderMobile from "../mobile/HeaderContent";
import FooterWeb from "../web/Footer";
// import Sidebar from "../sidebar";
import SettingsContextProvider from "../../contexts/SettingsContext";
import PinContextProvider from "../../contexts/PinContext";
import BookmarkContextProvider from "../../contexts/BookmarkContext";
import SidenavContextProvider from "../../contexts/SidenavContext";
import styles from "./Layout.module.scss";

const Layout = ({
  meta,
  categoryList,
  categoryTree,
  selectedCategoryId,
  contentTitle,
  content,
}) => {
  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <SidenavContextProvider>
            <Meta
              title={meta.title}
              description={meta.description}
              url={meta.url}
              image={meta.image}
              type={meta.type}
            />

            {/* <ArabicDialog /> */}

            <div className={`${styles.wrapper} ${styles.layout3}`}>
              <div className={styles.header}>
                <HeaderWeb page={null} />
                <HeaderMobile title={contentTitle} />
              </div>

              <div className={styles.body}>
                {/* <div className={styles.sidebar}>
                  <Sidebar
                    categoryList={categoryList}
                    categoryTree={categoryTree}
                    selectedCategoryId={selectedCategoryId}
                  />
                </div> */}
                <main id="viewport" className={styles.content}>
                  <div className={styles.container}>{content}</div>
                </main>
              </div>

              <div className={styles.footer}>
                <FooterWeb />
              </div>
            </div>
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
};

export default Layout;
