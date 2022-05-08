import { server } from "../lib/config";
import { getAllCategories, getAllCategoriesTree } from "../lib/fetch";
import Layout from "../components/utils/LayoutTertiary";
import GratefulContent from "../components/pages/grateful";

export default function GratefulPage({ categoryList, categoryTree }) {
  const pageTitle = "Grateful";

  return (
    <Layout
      meta={{
        title: pageTitle,
        description: "Hadith application in Vietnamese",
        url: `${server}/grateful`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categoryList={categoryList}
      categoryTree={categoryTree}
      selectedCategoryId={null}
      contentTitle={pageTitle}
      content={<GratefulContent />}
    />
  );
}

export async function getStaticProps(context) {
  const categoryList = await getAllCategories();
  const categoryTree = await getAllCategoriesTree();

  if (!categoryList || !categoryTree) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categoryList,
      categoryTree,
    },
  };
}
