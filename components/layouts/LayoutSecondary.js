// import { useContext } from "react";
// import { LayoutContext } from "../../contexts/LayoutContext";
import SettingsContextProvider from "../../contexts/SettingsContext";
import PinContextProvider from "../../contexts/PinContext";
import BookmarkContextProvider from "../../contexts/BookmarkContext";
import SidenavContextProvider from "../../contexts/SidenavContext";
import HeaderWeb from "../web/Header";
import HeaderMobile from "../mobile/HeaderSecondary";
import FooterWeb from "../web/Footer";
import Sidebar from "../sidebar";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  // const { contentTitle } = useContext(LayoutContext);
  // console.log(contentTitle);

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <SidenavContextProvider>
            {/* <ArabicDialog /> */}

            <div className={styles.wrapper}>
              <div className={styles.header}>
                <HeaderWeb page={null} />
                <HeaderMobile
                  // contentTitle={contentTitle}
                  categoryList={children.props.categoryList}
                  categoryTree={children.props.categoryTree}
                  selectedCategoryId={children.props.selectedCategoryId}
                  backLink={children.props.backLink}
                />
              </div>

              <div className={styles.body}>
                <div className={styles.sidebar}>
                  <Sidebar
                    categoryList={children.props.categoryList}
                    categoryTree={children.props.categoryTree}
                    selectedCategoryId={children.props.selectedCategoryId}
                  />
                </div>
                <main id="viewport" className={styles.content}>
                  <div className={styles.container}>{children}</div>
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
