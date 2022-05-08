import { server } from "../lib/config";
import { getAllCategories, getAllCategoriesTree } from "../lib/fetch";
import Layout from "../components/utils/LayoutTertiary";
import DeeniinfotechContent from "../components/pages/deeniinfotech";

export default function DeeniInfoTech({ categoryList, categoryTree }) {
  const pageTitle = "Deeni Info Tech";

  return (
    <Layout
      meta={{
        title: pageTitle,
        description: `${pageTitle} : A non-profitable software development organization to spread Dawah all over the world`,
        url: `${server}/deeniinfotech`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categoryList={categoryList}
      categoryTree={categoryTree}
      selectedCategoryId={null}
      contentTitle={pageTitle}
      content={<DeeniinfotechContent />}
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
