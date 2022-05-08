import Meta from "../core/meta";
import HeaderWeb from "../web/Header";
import HeaderMobile from "../mobile/HeaderPrimary";
import FooterWeb from "../web/Footer";
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

            <div className={styles.wrapper}>
              <div className={styles.header}>
                <HeaderWeb page="home" />
                <HeaderMobile
                  contentTitle={contentTitle}
                  categoryList={categoryList}
                  categoryTree={categoryTree}
                  selectedCategoryId={selectedCategoryId}
                />
              </div>

              <main id="viewport" className="viewport">
                {content}
              </main>

              <div className={styles.footer}>
                <FooterWeb />
                {/* <FooterMobile /> */}
              </div>
            </div>
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
};

export default Layout;
