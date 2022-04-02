import { server } from "../lib/config";
import { getAllCategories, getAllCategoriesTree } from "../lib/fetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BookmarkContent from "../components/bookmark/page";
import BookmarkMobile from "../components/mobile/Storage";
import Layout from "../components/utils/LayoutSecondary";

export default function Bookmark({ categoryList, categoryTree }) {
  const router = useRouter();
  const { key } = router.query;
  const [bookmarkName, setBookmarkName] = useState(null);
  const [isExists, setExists] = useState(true);
  const [bookmarksData, setBookmarksData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    const bookmarks = JSON.parse(savedBookmarks);

    const queryKey = "key";
    const keyMatcher = router.asPath.match(
      new RegExp(`[&?]${queryKey}=(.*?)(&|$)`)
    );

    const x = window.matchMedia("(min-width: 1024px)");

    if (!x.matches && !keyMatcher && !key) {
      setIsMobile(true);
      return;
    } else {
      setIsMobile(false);
    }

    if (!keyMatcher) {
      router.push("/404");
      return <></>;
    }

    if (!key) {
      return <></>;
    }

    if (!bookmarks[key]) {
      router.push("/404");
      return <></>;
    }

    setBookmarkName(bookmarks[key].name);

    if (bookmarks.hasOwnProperty(key)) {
      if (bookmarks[key]["entry"].length > 0) {
        setBookmarksData(bookmarks[key]["entry"]);
      } else {
        setExists(false);
      }
    }
  }, [key]);

  const updateBookmarksData = (id) => {
    let updatedBookmarksData = bookmarksData.filter((item) => !(item.id == id));
    setBookmarksData(updatedBookmarksData);
  };

  if (isMobile) {
    return (
      <Layout
        meta={{
          title: `Bookmark ${bookmarkName}`,
          description: `Bookmark ${bookmarkName}. Hadith application in Vietnamese.`,
          url: `${server}/bookmarks`,
          image: `${server}/img/s_logo.png`,
          type: "website",
        }}
        categoryList={categoryList}
        categoryTree={categoryTree}
        selectedCategoryId={null}
        contentTitle="Bookmarks & Pin"
        content={<BookmarkMobile key={key} />}
      />
    );
  }

  return (
    <Layout
      meta={{
        title: `Bookmark ${bookmarkName}`,
        description: `Bookmark ${bookmarkName}. Hadith application in Vietnamese.`,
        url: `${server}/bookmarks?key=favorites`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categoryList={categoryList}
      categoryTree={categoryTree}
      selectedCategoryId={null}
      contentTitle={bookmarkName}
      content={
        <BookmarkContent //
          name={bookmarkName}
          data={bookmarksData}
          exist={isExists}
          isBookmarkPage={true}
          key={key}
          queryKey={key}
          updateBookmarksData={updateBookmarksData}
        />
      }
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
