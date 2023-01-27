import { server } from "../lib/config";
import {
  getRootCategories,
  getAllCategories,
  getAllCategoriesTree,
} from "../lib/fetch";
import Meta from "../components/core/meta";
import Layout from "../components/layouts/LayoutPrimary";
import Banner from "../components/home/banner";
import CategoryList from "../components/home/category-list";

export default function Home({ rootCategories }) {
  return (
    <>
      <Meta
        title="Homepage"
        description="Hadith application in Vietnamese"
        url={server}
        image={`${server}/img/s_logo.png`}
        type="website"
      />

      <Banner />
      <CategoryList categories={rootCategories} />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const rootCategories = await getRootCategories();
  const categoryList = await getAllCategories();
  const categoryTree = await getAllCategoriesTree();

  if (!rootCategories || !categoryList || !categoryTree) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      rootCategories,
      categoryList,
      categoryTree,
      contentTitle: null,
      selectedCategoryId: null,
    },
  };
}
