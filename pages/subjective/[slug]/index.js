import { server } from '../../../lib/config'
import {
  getChaptersInfo,
  getParentSubjectives,
  getParentSubjectiveBySlug,
} from "../../../lib/fetch";
// import { useState } from "react";
import SettingsContextProvider from "../../../contexts/SettingsContext";
import AudioPlayerContextProvider from "../../../contexts/AudioPlayerContext";
import PinContextProvider from "../../../contexts/PinContext";
import BookmarkContextProvider from "../../../contexts/BookmarkContext";
import SidenavContextProvider from "../../../contexts/SidenavContext";
import Meta from "../../../components/core/meta";
//import SearchModal from '../../components/core/search-modal'
import HeaderWeb from "../../../components/layout2/web/header";
import HeaderMobile from "../../../components/mobile/header-subjective";
import FooterWeb from "../../../components/web/footer";
import FooterMobile from "../../../components/mobile/footer-home";
import AudioPlayer from "../../../components/surah/audio-player";
import ArabicDialog from "../../../components/core/arabic-dialog";
import SubjectiveVerses from "../../../components/subjective/verses";
import SubjectiveList from "../../../components/subjective/list";

export default function Subjective({ slug, chapters, subjective }) {
  // const [searchModalOpen, updateSearchModalOpen] = useState(false)

  // const searchModalController = open => {
  //     updateSearchModalOpen(open)
  // }

  const name = subjective.title;

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <AudioPlayerContextProvider>
            <SidenavContextProvider>
              <Meta
                title={`Subjective ${name}`}
                description={`Subjective form the holy Quran`}
                url={`${server}/subjective/${slug}`}
                image={`${server}/img/s_logo.png`}
                type="website"
              />

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

              <HeaderMobile
                title={name}
                backLink={"/subjective"}
              />

              <main
                id="viewport"
                className="viewport viewport_surah"
              >
                  <SubjectiveList
                    chapters={chapters}
                    subjectives={subjective.children}
                    contentTitle={subjective.title}
                  />

              </main>

              <AudioPlayer />

              <FooterWeb />
              <FooterMobile />
            </SidenavContextProvider>
          </AudioPlayerContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const chaptersInfo = await getChaptersInfo();
  const subjective = await getParentSubjectiveBySlug(slug);

  if (!subjective) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slug: slug,
      chapters: chaptersInfo,
      subjective,
      key: slug,
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  // const subjectives = await getParentSubjectives();
  let paths = [];

  // subjectives.map((subjective) => {
  //   let slug = encodeURI(subjective.slug);
  //   let obj = { params: { slug: slug } };
  //   paths.push(obj);
  // });

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
