import { server } from "../../lib/config";
import {
  getAllCategories,
  getAllCategoriesTree,
  getHadithDetailsById,
} from "../../lib/fetch";
import Layout from "../../components/utils/LayoutSecondary";
import HadithContent from "../../components/content/Hadith";

export default function HadithDetail({ categoryList, categoryTree, hadith }) {
  return (
    <Layout
      meta={{
        title: `Hadith ${hadith.title}`,
        description: `Hadith ${hadith.title}. Hadith application in Vietnamese.`,
        url: `${server}/hadiths/${hadith.id}`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categoryList={categoryList}
      categoryTree={categoryTree}
      selectedCategoryId={hadith.categories[0]}
      contentTitle={hadith.title}
      content={<HadithContent hadith={hadith} />}
      backLink={`/categories/${hadith.categories[0]}/hadiths`}
    />
  );
}

export async function getStaticProps(context) {
  const id = parseInt(encodeURI(context.params.id));
  const details = await getHadithDetailsById(id);
  const categoryList = await getAllCategories();
  const categoryTree = await getAllCategoriesTree();

  if (!details || !categoryList || !categoryTree) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categoryList,
      categoryTree,
      hadith: details,
      key: id,
    },
    // revalidate: 60,
  };
}

export async function getStaticPaths() {
  let paths = [];

  let obj = {
    params: {
      id: String(1),
    },
  };

  paths.push(obj);

  return {
    paths: paths,
    // fallback: false,
    fallback: "blocking",
  };
}
