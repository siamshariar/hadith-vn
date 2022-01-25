import { server } from "../../../lib/config";
import { getChaptersInfo, getChapterDetails } from "../../../lib/fetch";
//import { useState } from 'react'
import SettingsContextProvider from "../../../contexts/SettingsContext";
import AudioPlayerContextProvider from "../../../contexts/AudioPlayerContext";
import PinContextProvider from "../../../contexts/PinContext";
import BookmarkContextProvider from "../../../contexts/BookmarkContext";
import SidenavContextProvider from "../../../contexts/SidenavContext";
import Meta from "../../../components/core/meta";
//import Viewport from '../../../components/core/viewport'
//import SearchModal from '../../../components/core/search-modal'
import HeaderWeb from "../../../components/web/header";
import HeaderMobile from "../../../components/mobile/header-chapter";
//import FooterMobile from '../../../components/mobile/footer-chapter'
import ChapterContent from "../../../components/surah/content";
import AudioPlayer from "../../../components/surah/audio-player";
import FooterWeb from "../../../components/web/footer";
import ArabicDialog from "../../../components/core/arabic-dialog";

export default function Chapter({
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
              title={`Chương ${chapterName}`}
              description={`Chương ${chapterName}. Quran application in Vietnamese.`}
              url={`${server}/chapters/${chapterSlug}`}
              image={`${server}/img/s_logo.png`}
              type="website"
            />

            <ArabicDialog />

            {/* <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            /> */}

            <HeaderWeb
              page="surah"
              chapters={chapters}
              isChapterPage={true}
              // searchModalController={searchModalController}
            />

            <AudioPlayerContextProvider>
              <HeaderMobile
                contentTitle={chapterName}
                chapterNo={chapterNo}
                chapters={chapters}
                // chapterName={chapterName}
              />

              <main
                id="viewport"
                className="viewport viewport_surah viewport_no_footer"
              >
                <ChapterContent
                  contentType="chapter"
                  contentTitle={chapterName}
                  chapterNo={chapterNo}
                  chapterName={chapterName}
                  chapterSlug={chapterSlug}
                  chapterMp3Url={chapterMp3Url}
                  verses={verses}
                  // suraTranslation={suraTranslation}
                  // prevChapter={prevChapter}
                  // nextChapter={nextChapter}
                  chapters={chapters}
                />
              </main>

              <AudioPlayer />
            </AudioPlayerContextProvider>

            <FooterWeb />
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
  const chapterDetails = await getChapterDetails(chapterNo);
  const chaptersInfo = await getChaptersInfo();

  return {
    props: {
      chapterNo: chapterDetails.chapterNo,
      chapterName: chaptersInfo[chapterNo - 1].name,
      chapterSlug: chaptersInfo[chapterNo - 1].slug,
      chapterMp3Url: chapterDetails.mp3Url,
      verses: chapterDetails.verses,
      chapters: chaptersInfo,
      key: chapterDetails.chapterNo,
    },
  };
}

export async function getStaticPaths() {
  const chapters = await getChaptersInfo();
  let paths = [];

  chapters.map((chapter) => {
    let slug = encodeURI(chapter.slug);
    let obj = { params: { slug: slug } };
    paths.push(obj);
  });

  return {
    paths: paths,
    fallback: false,
  };
}
