import { server } from "../lib/config";
import { getRootCategories } from "../lib/fetch";
//import { useState } from 'react'
import SettingsContextProvider from "../contexts/SettingsContext";

import Meta from "../components/core/meta";
//import Viewport from '../components/core/viewport'
//import SearchModal from '../components/core/search-modal'
import HeaderWeb from "../components/web/header";
import HeaderMobile from "../components/mobile/header-home";
import FooterWeb from "../components/web/footer";
import FooterMobile from "../components/mobile/footer-home";
import Banner from "../components/home/banner";
import CategoryList from "../components/home/category-list";
import PinContextProvider from "../contexts/PinContext";
import BookmarkContextProvider from "../contexts/BookmarkContext";
import SidenavContextProvider from "../contexts/SidenavContext";

// init()

export default function Home({ categories }) {
  // const [searchModalOpen, updateSearchModalOpen] = useState(false)

  // const searchModalController = open => {
  //     updateSearchModalOpen(open)
  // }

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <SidenavContextProvider>
            <Meta
              title=""
              description="Quran application in Vietnamese"
              url={server}
              image={`${server}/img/s_logo.png`}
              type="website"
            />

            {/* <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            /> */}

            <HeaderWeb
              page="home"
              categories={categories}
              isChapterPage={false}
              // searchModalController={searchModalController}
            />

            <HeaderMobile
              categories={categories}
              //searchModalController={searchModalController}
            />

            <main id="viewport" className="viewport">
              <Banner />
              <CategoryList categories={categories} />
            </main>

            <FooterWeb />

            <FooterMobile />
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
}

export async function getStaticProps(context) {
  const categories = await getRootCategories();

  if (!categories) {
    return {
      notFound: true,
    };
  }

  // Pass data to the page via props
  return {
    props: { categories },
  };
}
