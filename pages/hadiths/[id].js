import { server } from "../../lib/config";
import {
  getRootCategories,
  getAllCategories,
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

export default function Verse({
  chapters,
  chapterNo,
  chapterName,
  chapterSlug,
  chapterMp3Url,
  verses,
}) {
  // const [searchModalOpen, updateSearchModalOpen] = useState(false)

  // const searchModalController = open => {
  //     updateSearchModalOpen(open)
  // }

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <SidenavContextProvider>
            <Meta
              title={`Chương ${chapterName} : Câu ${verses[0].verseNo}`}
              description={`${verses[0].translation}`}
              url={`${server}/chapters/${chapterSlug}/verses/${verses[0].verseNo}`}
              image={`${server}/img/s_logo.png`}
              type="website"
            />

            <ArabicDialog />

            {/* <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            /> */}

            {/* <Sidenav chapters={chapters} /> */}

            <HeaderWeb
              page="surah"
              chapters={chapters}
              isChapterPage={true}
              // searchModalController={searchModalController}
            />

            <AudioPlayerContextProvider>
              <HeaderMobile
                contentTitle={`${chapterName} : Câu ${verses[0].verseNo}`}
                chapterNo={chapterNo}
                // chapterName={chapterName}
                chapters={chapters}
              />

              <main
                id="viewport"
                className="viewport viewport_surah viewport_no_footer"
              >
                <ChapterContent
                  contentType="verse"
                  contentTitle={`${chapterName} : Câu ${verses[0].verseNo}`}
                  chapterNo={chapterNo}
                  chapterName={chapterName}
                  chapterSlug={chapterSlug}
                  chapterMp3Url={chapterMp3Url}
                  verses={verses}
                  // prevChapter={prevChapter}
                  // nextChapter={nextChapter}
                  chapters={chapters}
                />
              </main>

              <AudioPlayer />
            </AudioPlayerContextProvider>

            {/* <FooterMobile /> */}
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
}

export async function getStaticProps(context) {
  const id = parseInt(encodeURI(context.params.id));

  let verseDetails = [];
  const details = await getHadithDetailsById(2962);

  if (!details) {
    return {
      notFound: true,
    };
  }

  verseDetails.push(details);

  // const chapterNo = details.chapter.chapterNo;
  const categories = await getAllCategories();

  return {
    props: {
      chapterNo: id,
      chapterName: details.title,
      chapterSlug: details.id,
      chapterMp3Url: null,
      verses: verseDetails,
      chapters: categories,
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

const uniqueKey = (chapterNo, verseNo) => {
  let s1 = "0000" + chapterNo;
  s1 = s1.substr(s1.length - 3);

  let s2 = "0000" + verseNo;
  s2 = s2.substr(s2.length - 3);

  return s1 + s2;
};
