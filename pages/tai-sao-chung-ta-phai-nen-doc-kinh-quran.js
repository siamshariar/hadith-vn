import { server } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
//import { useState } from 'react'
import SettingsContextProvider from "../contexts/SettingsContext";
import Meta from "../components/core/meta";
//import SearchModal from '../components/core/search-modal'
import HeaderWeb from "../components/web/header";
import HeaderMobile from "../components/mobile/header-content";
import FooterWeb from "../components/web/footer";
//import FooterMobile from '../components/mobile/footer-home'
import Sidenav from "../components/sidenav";
import WNTRQContent from "../components/pages/why-need-to-read-quran";
import PinContextProvider from "../contexts/PinContext";
import BookmarkContextProvider from "../contexts/BookmarkContext";
import SidenavContextProvider from "../contexts/SidenavContext";

// init()

export default function ContentPage({ chapters }) {
  // const [searchModalOpen, updateSearchModalOpen] = useState(false)

  // const searchModalController = open => {
  //     updateSearchModalOpen(open)
  // }

  const pageTitle = "Biết thêm hêm về Quran";

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <SidenavContextProvider>
            <Meta
              title={`Tại sao chúng ta phải nên đọc Kinh Quran - ${pageTitle}`}
              description="Tại sao chúng ta phải nên đọc Kinh Quran - Về Kinh Quran. Quran application in Vietnamese."
              url={`${server}/tai-sao-chung-ta-phai-nen-doc-kinh-quran`}
              image={`${server}/img/s_logo.png`}
              type="website"
            />

            {/* <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            /> */}

            {/* <Sidenav chapters={chapters} /> */}

            <HeaderWeb
              page="surah"
              chapters={chapters}
              isChapterPage={true}
              //searchModalController={searchModalController}
            />

            <HeaderMobile
              //searchModalController={searchModalController}
              title={pageTitle}
            />

            <main id="viewport" className="viewport viewport_no_footer">
              <div className="content layout2">
                <Sidenav chapters={chapters} />

                <div className="content_wrapper">
                  <WNTRQContent page_title={pageTitle} />
                </div>
              </div>
            </main>

            <FooterWeb />

            {/* <FooterMobile /> */}
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
}

export async function getStaticProps(context) {
  const chapters = await getChaptersInfo();

  if (!chapters) {
    return {
      notFound: true,
    };
  }

  // Pass data to the page via props
  return {
    props: { chapters },
  };
}
