import { server } from "../lib/config";
import { getAllCategories, getAllCategoriesTree } from "../lib/fetch";
import Layout from "../components/utils/LayoutTertiary";
import PrivacyPolicyContent from "../components/pages/privacy-policy";

export default function PrivacyPolicyPage({ categoryList, categoryTree }) {
  const pageTitle = "Privacy Policy";

  return (
    <Layout
      meta={{
        title: pageTitle,
        description: "Hadith application in Vietnamese",
        url: `${server}/privacy-policy`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categoryList={categoryList}
      categoryTree={categoryTree}
      selectedCategoryId={null}
      contentTitle={pageTitle}
      content={<PrivacyPolicyContent />}
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
