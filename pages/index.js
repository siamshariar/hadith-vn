import { server } from "../lib/config";
import {
  getRootCategories,
  getAllCategories,
  getAllCategoriesTree,
} from "../lib/fetch";
import Layout from "../components/utils/LayoutPrimary";
import Banner from "../components/home/banner";
import CategoryList from "../components/home/category-list";

export default function Home({ rootCategories, categoryList, categoryTree }) {
  return (
    <Layout
      meta={{
        title: ``,
        description: "Hadith application in Vietnamese",
        url: `${server}`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categoryList={categoryList}
      categoryTree={categoryTree}
      selectedCategoryId={null}
      contentTitle={null}
      content={
        <>
          <Banner />
          <CategoryList categories={rootCategories} />
        </>
      }
    />
  );
}

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
    },
  };
}
