import { server } from '../../../../lib/config'
import { getChaptersInfo, getVerseDetails } from "../../../../lib/fetch";
// import { useState } from 'react'
import SettingsContextProvider from "../../../../contexts/SettingsContext";
import AudioPlayerContextProvider from "../../../../contexts/AudioPlayerContext";
import PinContextProvider from "../../../../contexts/PinContext";
import BookmarkContextProvider from "../../../../contexts/BookmarkContext";
import SidenavContextProvider from "../../../../contexts/SidenavContext";
import Meta from "../../../../components/core/meta";
// import SearchModal from '../../../../components/core/search-modal'
import HeaderWeb from "../../../../components/layout2/web/header";
import HeaderMobile from "../../../../components/mobile/header-chapter";
// import FooterMobile from '../../../../components/mobile/footer-chapter'
// import Sidenav from '../../../../components/sidenav'
import ChapterContent from "../../../../components/layout2/surah/content";
import AudioPlayer from "../../../../components/surah/audio-player";
import ArabicDialog from "../../../../components/core/arabic-dialog";

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
  const slug = encodeURI(context.params.slug);
  const chapterNo = parseInt(slug);
  const verseNo = context.params.verseNo;

  let verseDetails = [];
  const details = await getVerseDetails(chapterNo, verseNo);

  if (!details) {
    return {
      notFound: true,
    }
  }

  verseDetails.push(details);

  // const chapterNo = details.chapter.chapterNo;
  const chaptersInfo = await getChaptersInfo();

  return {
    props: {
      chapterNo: chapterNo,
      chapterName: chaptersInfo[chapterNo - 1].name,
      chapterSlug: chaptersInfo[chapterNo - 1].slug,
      chapterMp3Url: chaptersInfo[chapterNo - 1].mp3Url,
      verses: verseDetails,
      chapters: chaptersInfo,
      key: uniqueKey(chapterNo, verseNo),
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const chapters = await getChaptersInfo();
  let paths = [];

  chapters.map((chapter) => {
    let slug = encodeURI(chapter.slug);
    // let totalVerse = parseInt(chapter.totalVerse);

    for (let i = 1; i <= 0; i++) {
      let obj = {
        params: {
          slug: slug,
          verseNo: String(i),
        },
      };
      paths.push(obj);
    }
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

const uniqueKey = (chapterNo, verseNo) => {
  let s1 = "0000" + chapterNo;
  s1 = s1.substr(s1.length - 3);

  let s2 = "0000" + verseNo;
  s2 = s2.substr(s2.length - 3);

  return s1 + s2;
};
