import { server } from "../lib/config";
import {
  getAllCategories,
  getAllCategoriesTree,
  getCategoryById,
  getHadithsByCategory,
} from "../lib/fetch";

import { useContext } from "react";
import { BookmarkContext } from "../contexts/BookmarkContext";
//import { useState } from 'react'
// import SettingsContextProvider from "../../../contexts/SettingsContext";
// import AudioPlayerContextProvider from "../../../contexts/AudioPlayerContext";
// import PinContextProvider from "../../../contexts/PinContext";
// import BookmarkContextProvider from "../../../contexts/BookmarkContext";
// import SidenavContextProvider from "../../../contexts/SidenavContext";
// import Meta from "../../../components/core/meta";
//import Viewport from '../../../components/core/viewport'
//import SearchModal from '../../../components/core/search-modal'
// import HeaderWeb from "../../../components/web/header";
// import HeaderMobile from "../../../components/mobile/header-chapter";
//import FooterMobile from '../../../components/mobile/footer-chapter'
// import CategoryContent from "../../../components/surah/category";
// import AudioPlayer from "../../../components/surah/audio-player";
// import FooterWeb from "../../../components/web/footer";
// import ArabicDialog from "../../../components/core/arabic-dialog";

import CategoryContent from "../components/content/category";

import Layout from "../components/utils/LayoutPrimary";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Categories({ category, categories, hadiths }) {
  const router = useRouter();
  const { key } = router.query;

  const [bookmarkName, setBookmarkName] = useState(null);
  const [bookmarksData, setBookmarksData] = useState([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    const bookmarks = JSON.parse(savedBookmarks);
    setBookmarksData(bookmarks);
  }, [bookmarksData]);

  // console.log(categories);
  return (
    <Layout
      meta={{
        title: `Bookmark ${bookmarkName}`,
        description: `Bookmark ${bookmarkName}. Hadith application in Vietnamese.`,
        url: `${server}/chapters/${bookmarkName}`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categories={categories}
      categoryTitle={bookmarkName}
      content={
        // <CategoryContent
        //   category={category}
        //   categories={categories}
        //   hadiths={hadiths}
        // />

        <MyContent />
      }
    />
  );
}

export async function getStaticProps(context) {
  // const id = encodeURI(context.params.id);
  // const categoryId = parseInt(id);
  // const hadiths = await getHadithsByCategory(categoryId);
  const categories = await getAllCategoriesTree();
  // const category = await getCategoryById(categoryId);

  return {
    props: {
      category: null,
      categories,
      hadiths: null,
      key: 1,
    },
  };
}

const MyContent = () => {
  const { bookmarks, changeBookmarks } = useContext(BookmarkContext);
  const [bookmarksData, setBookmarksData] = useState([]);
  useEffect(() => {
    setBookmarksData(bookmarks);
    console.log(bookmarks);
  }, [bookmarksData]);

  return (
    <div className="nazmul">
      {Object.keys(bookmarks).map((key) => (
        <div className="">{key}</div>
      ))}
    </div>
  );
};
