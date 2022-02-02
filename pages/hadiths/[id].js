import { server } from "../../lib/config";
import {
  getRootCategories,
  getAllCategories,
  getAllCategoriesTree,
  getHadithDetailsById,
} from "../../lib/fetch";
// import { useState } from 'react'
import SettingsContextProvider from "../../contexts/SettingsContext";
import AudioPlayerContextProvider from "../../contexts/AudioPlayerContext";
import PinContextProvider from "../../contexts/PinContext";
import BookmarkContextProvider from "../../contexts/BookmarkContext";
import SidenavContextProvider from "../../contexts/SidenavContext";
import Meta from "../../components/core/meta";
// import SearchModal from '../../../../components/core/search-modal'
import HeaderWeb from "../../components/web/header";
import HeaderMobile from "../../components/mobile/header-chapter";
// import FooterMobile from '../../../../components/mobile/footer-chapter'
// import Sidenav from '../../../../components/sidenav'
import ChapterContent from "../../components/surah/content";
import AudioPlayer from "../../components/surah/audio-player";
import ArabicDialog from "../../components/core/arabic-dialog";

import HadithContent from "../../components/content/Hadith";

import Layout from "../../components/utils/LayoutPrimary";

// export default function Verse({
//   chapters,
//   chapterNo,
//   chapterName,
//   chapterSlug,
//   chapterMp3Url,
//   verses,
// }) {
//   return (
//     <SettingsContextProvider>
//       <PinContextProvider>
//         <BookmarkContextProvider>
//           <SidenavContextProvider>
//             <Meta
//               title={`Chương ${chapterName} : Câu ${verses[0].verseNo}`}
//               description={`${verses[0].translation}`}
//               url={`${server}/chapters/${chapterSlug}/verses/${verses[0].verseNo}`}
//               image={`${server}/img/s_logo.png`}
//               type="website"
//             />

//             <ArabicDialog />

//             {/* <SearchModal
//                 open={searchModalOpen}
//                 searchModalController={searchModalController}
//             /> */}

//             {/* <Sidenav chapters={chapters} /> */}

//             <HeaderWeb
//               page="surah"
//               chapters={chapters}
//               isChapterPage={true}
//               // searchModalController={searchModalController}
//             />

//             <AudioPlayerContextProvider>
//               <HeaderMobile
//                 contentTitle={`${chapterName} : Câu ${verses[0].verseNo}`}
//                 chapterNo={chapterNo}
//                 // chapterName={chapterName}
//                 chapters={chapters}
//               />

//               <main
//                 id="viewport"
//                 className="viewport viewport_surah viewport_no_footer"
//               >
//                 <ChapterContent
//                   contentType="verse"
//                   contentTitle={`${chapterName} : Câu ${verses[0].verseNo}`}
//                   chapterNo={chapterNo}
//                   chapterName={chapterName}
//                   chapterSlug={chapterSlug}
//                   chapterMp3Url={chapterMp3Url}
//                   verses={verses}
//                   // prevChapter={prevChapter}
//                   // nextChapter={nextChapter}
//                   chapters={chapters}
//                 />
//               </main>

//               <AudioPlayer />
//             </AudioPlayerContextProvider>

//             {/* <FooterMobile /> */}
//           </SidenavContextProvider>
//         </BookmarkContextProvider>
//       </PinContextProvider>
//     </SettingsContextProvider>
//   );
// }

export default function HadithDetail({ categories, hadith }) {
  return (
    <Layout
      meta={{
        title: `Hadith ${hadith.title}`,
        description: `Hadith ${hadith.title}. Hadith application in Vietnamese.`,
        url: `${server}/hadiths/${hadith.id}`,
        image: `${server}/img/s_logo.png`,
        type: "website",
      }}
      categories={categories}
      hadiths={hadith}
      categoryTitle={hadith.title}
      content={<HadithContent hadith={hadith} />}
    />
  );
}

export async function getStaticProps(context) {
  const id = parseInt(encodeURI(context.params.id));
  const details = await getHadithDetailsById(id);

  if (!details) {
    return {
      notFound: true,
    };
  }

  const categories = await getAllCategoriesTree();

  return {
    props: {
      categories,
      hadith: details,
      key: id,
    },
    revalidate: 60,
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
    fallback: "blocking",
  };
}
