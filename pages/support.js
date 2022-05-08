import { server } from "../lib/config";
import { getAllCategories, getAllCategoriesTree } from "../lib/fetch";
import Layout from "../components/utils/LayoutTertiary";
import SupportContent from "../components/pages/support";

export default function SupportPage({ categoryList, categoryTree }) {
  const pageTitle = "Support";

  return (
    <Layout
      meta={{
        title: pageTitle,
        description:
          "Please mail us if you want to support. Any kind of support is highly appreciable. Email: deeniinfotech@gmail.com",
        url: `${server}/support`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categoryList={categoryList}
      categoryTree={categoryTree}
      selectedCategoryId={null}
      contentTitle={pageTitle}
      content={<SupportContent />}
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
