import { server } from "../../../lib/config";
import {
  getAllCategories,
  getAllCategoriesTree,
  getCategoryById,
  getHadithsByCategory,
} from "../../../lib/fetch";
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

import CategoryContent from "../../../components/content/category";

import Layout from "../../../components/utils/LayoutPrimary";

export default function Categories({ category, categories, hadiths }) {
  // console.log(categories);
  return (
    <Layout
      meta={{
        title: `Category ${category.title}`,
        description: `Category ${category.title}. Hadith application in Vietnamese.`,
        url: `${server}/chapters/${category.title}`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categories={categories}
      hadiths={hadiths}
      categoryTitle={category.title}
      content={
        <CategoryContent
          category={category}
          categories={categories}
          hadiths={hadiths}
        />
      }
    />
  );
}

export async function getStaticProps(context) {
  const id = encodeURI(context.params.id);
  const categoryId = parseInt(id);
  const hadiths = await getHadithsByCategory(categoryId);
  const categories = await getAllCategoriesTree();
  const category = await getCategoryById(categoryId);

  return {
    props: {
      category,
      categories,
      hadiths,
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
