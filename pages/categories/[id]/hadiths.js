import { server } from "../../../lib/config";
import {
  getAllCategories,
  getAllCategoriesTree,
  getCategoryById,
  getHadithsByCategory,
} from "../../../lib/fetch";
import Layout from "../../../components/utils/LayoutSecondary";
import CategoryContent from "../../../components/content/Category";

export default function Categories({
  categoryList,
  categoryTree,
  categoryId,
  category,
  hadiths,
}) {
  return (
    <Layout
      meta={{
        title: `Category ${category.title}`,
        description: `Category ${category.title}. Hadith application in Vietnamese.`,
        url: `${server}/categories/${category.id}/hadiths`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categoryList={categoryList}
      categoryTree={categoryTree}
      selectedCategoryId={categoryId}
      contentTitle={category.title}
      content={<CategoryContent hadiths={hadiths} category={category} />}
      backLink="/"
    />
  );
}

export async function getStaticProps(context) {
  const id = encodeURI(context.params.id);
  const categoryId = parseInt(id);
  const hadiths = await getHadithsByCategory(categoryId);
  const categoryList = await getAllCategories();
  const categoryTree = await getAllCategoriesTree();
  const category = await getCategoryById(categoryId);

  if (!hadiths || !categoryList || !categoryTree) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categoryList,
      categoryTree,
      categoryId,
      category,
      hadiths,
      key: categoryId,
    },
  };
}

export async function getStaticPaths() {
  let paths = [];
  // const categories = await getAllCategories();
  // categories.map((category) => {
  //   let id = encodeURI(category.id);
  //   let obj = { params: { id: id } };
  //   paths.push(obj);
  // });

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
