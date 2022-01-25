import { server } from "../../lib/config";
import {
  getRootCategories,
  getAllCategories,
  getHadithsByCategory,
} from "../../lib/fetch";
//import { useState } from 'react'
import SettingsContextProvider from "../../contexts/SettingsContext";
import AudioPlayerContextProvider from "../../contexts/AudioPlayerContext";
import PinContextProvider from "../../contexts/PinContext";
import BookmarkContextProvider from "../../contexts/BookmarkContext";
import SidenavContextProvider from "../../contexts/SidenavContext";
import Meta from "../../components/core/meta";
//import Viewport from '../../../components/core/viewport'
//import SearchModal from '../../../components/core/search-modal'
import HeaderWeb from "../../components/web/header";
import HeaderMobile from "../../components/mobile/header-chapter";
//import FooterMobile from '../../../components/mobile/footer-chapter'
import CategoryContent from "../../components/surah/category";
import AudioPlayer from "../../components/surah/audio-player";
import FooterWeb from "../../components/web/footer";
import ArabicDialog from "../../components/core/arabic-dialog";

export default function Categories({ categories, hadiths, categoryTitle }) {
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
              title={`Category ${categoryTitle}`}
              description={`Category ${categoryTitle}. Hadith application in Vietnamese.`}
              url={`${server}/chapters/${categoryTitle}`}
              image={`${server}/img/s_logo.png`}
              type="website"
            />

            <ArabicDialog />

            {/* <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            /> */}

            <HeaderWeb
              page="surah"
              chapters={categories}
              isChapterPage={true}
              // searchModalController={searchModalController}
            />

            <AudioPlayerContextProvider>
              <HeaderMobile
                contentTitle={categoryTitle}
                chapterNo={categoryTitle}
                chapters={categories}
                // chapterName={chapterName}
              />

              <main
                id="viewport"
                className="viewport viewport_surah viewport_no_footer"
              >
                <CategoryContent categories={categories} hadiths={hadiths} />
              </main>

              <AudioPlayer />
            </AudioPlayerContextProvider>

            <FooterWeb />
            {/* <FooterMobile /> */}
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
}

export async function getStaticProps(context) {
  const id = encodeURI(context.params.id);
  const categoryId = parseInt(id);
  const hadiths = await getHadithsByCategory(categoryId);
  const categories = await getAllCategories();

  const category = categories.filter((category) => {
    return category.id == categoryId;
  });

  return {
    props: {
      categories,
      hadiths,
      categoryTitle: category[0].title,
      key: categoryId,
    },
  };
}

export async function getStaticPaths() {
  const categories = await getAllCategories();
  let paths = [];

  categories.map((category) => {
    let id = encodeURI(category.id);
    let obj = { params: { id: id } };
    paths.push(obj);
  });

  return {
    paths: paths,
    fallback: false,
  };
}
