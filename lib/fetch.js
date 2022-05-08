// import { categories } from "../db/categories";
import { config } from "./config";

const apiBaseUrl = config.apiBaseUrl;
const language = config.language;

async function waitToCallApi() {
  await new Promise((resolve, reject) => setTimeout(resolve, 1200));
}

export async function getRootCategories() {
  // waitToCallApi()
  const res = await fetch(
    `${apiBaseUrl}/categories/roots/?language=${language}`
  );
  const info = await res.json();
  return info;
}

export async function getAllCategories() {
  // waitToCallApi()
  const res = await fetch(
    `${apiBaseUrl}/categories/list/?language=${language}`
  );
  const info = await res.json();
  return info;
}

export async function getAllCategoriesTree() {
  // waitToCallApi()
  const res = await fetch(
    `${apiBaseUrl}/categories/list/?language=${language}`
  );
  const data = await res.json();

  // const data = categories;

  const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});

  let root = [];

  data.forEach((el) => {
    // Handle the root element
    if (el.parent_id === null) {
      root.push(el);
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = data[idMapping[el.parent_id]];
    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el];
  });

  return root;
}

export async function getCategoryById(id) {
  // waitToCallApi()
  const res = await fetch(
    `${apiBaseUrl}/categories/list/?language=${language}`
  );
  const categories = await res.json();

  const category = categories.filter((item) => {
    return item.id == id;
  });

  return category[0];
}

export async function getHadithsByCategory(id) {
  // waitToCallApi()
  let allHadiths = [];
  let morePagesAvailable = true;
  let currentPage = 0;

  while (morePagesAvailable) {
    currentPage++;
    const res = await fetch(
      `${apiBaseUrl}/hadeeths/list/?language=${language}&category_id=${id}&page=${currentPage}`
    );
    let info = await res.json();
    let data = info.data;
    let meta = info.meta;
    // data.forEach((el) => allHadiths.unshift(el));
    allHadiths = allHadiths.concat(data);
    morePagesAvailable = currentPage < meta.last_page;
  }

  return allHadiths;
}

export async function getHadithDetailsById(id) {
  // waitToCallApi()
  const res = await fetch(
    `${apiBaseUrl}/hadeeths/one/?language=${language}&id=${id}`
  );
  const info = await res.json();
  return info;
}
