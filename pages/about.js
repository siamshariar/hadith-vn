import { server } from "../lib/config";
import { getAllCategories, getAllCategoriesTree } from "../lib/fetch";
import Layout from "../components/utils/LayoutTertiary";
import AboutContent from "../components/pages/about";

export default function AboutPage({ categoryList, categoryTree }) {
  const pageTitle = "About";

  return (
    <Layout
      meta={{
        title: pageTitle,
        description: "Hadith application in Vietnamese",
        url: `${server}/about`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categoryList={categoryList}
      categoryTree={categoryTree}
      selectedCategoryId={null}
      contentTitle={pageTitle}
      content={<AboutContent />}
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
