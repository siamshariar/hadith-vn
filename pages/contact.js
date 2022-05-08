import { server } from "../lib/config";
import { getAllCategories, getAllCategoriesTree } from "../lib/fetch";
import Layout from "../components/utils/LayoutTertiary";
import ContactContent from "../components/pages/contact";

export default function ContactPage({ categoryList, categoryTree }) {
  const pageTitle = "Contact";

  return (
    <Layout
      meta={{
        title: pageTitle,
        description: `Hadith application in Vietnamese. For all inquiries, please email us. We'll get back to you as soon as we can insha'Allah.`,
        url: `${server}/contact`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categoryList={categoryList}
      categoryTree={categoryTree}
      selectedCategoryId={null}
      contentTitle={pageTitle}
      content={<ContactContent />}
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
