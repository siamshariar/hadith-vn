import { server } from "../../lib/config";
import {
  getAllCategories,
  getAllCategoriesTree,
  getHadithDetailsById,
} from "../../lib/fetch";
import Meta from "../../components/core/meta";
import Layout from "../../components/layouts/LayoutSecondary";
import HadithContent from "../../components/content/Hadith";

export default function HadithDetail({ hadith }) {
  return (
    <>
      <Meta
        title={`Hadith ${hadith.title}`}
        description={`Hadith ${hadith.title}. Hadith application in Vietnamese.`}
        url={`${server}/hadiths/${hadith.id}`}
        image={`${server}/img/s_logo.png`}
        type="website"
      />

      <HadithContent hadith={hadith} />
    </>
  );
}

HadithDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const id = parseInt(encodeURI(context.params.id));
  const details = await getHadithDetailsById(id);
  const categoryList = await getAllCategories();
  const categoryTree = await getAllCategoriesTree();

  if (
    !details ||
    !categoryList ||
    !categoryTree ||
    !details.title ||
    !details.hadeeth
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categoryList,
      categoryTree,
      hadith: details,
      selectedCategoryId: details.categories[0],
      // contentTitle: details.title,
      backLink: `/categories/${details.categories[0]}/hadiths`,
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
