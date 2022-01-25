import { server } from '../../lib/config'
import { getChaptersInfo, getSubjectives } from "../../lib/fetch";
import SettingsContextProvider from "../../contexts/SettingsContext";
import AudioPlayerContextProvider from "../../contexts/AudioPlayerContext";
import PinContextProvider from "../../contexts/PinContext";
import BookmarkContextProvider from "../../contexts/BookmarkContext";
import SidenavContextProvider from "../../contexts/SidenavContext";
import Meta from "../../components/core/meta";
//import SearchModal from '../../../components/core/search-modal'
import HeaderWeb from "../../components/layout2/web/header";
import HeaderMobile from "../../components/mobile/header-subjective";
import FooterWeb from "../../components/web/footer";
import FooterMobile from "../../components/mobile/footer-home";
import SubjectiveList from "../../components/subjective/list";
// import AudioPlayer from "../../components/surah/audio-player";

export default function Subjective({ chapters, subjectives }) {
  // const [searchModalOpen, updateSearchModalOpen] = useState(false)

  // const searchModalController = open => {
  //     updateSearchModalOpen(open)
  // }

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <AudioPlayerContextProvider>
            <SidenavContextProvider>
              <Meta
                title={`Subjective`}
                description={`Subjective form the holy Quran`}
                url={`${server}/subjective`}
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
                title="Subjective"
                backLink={"/"}
              />

              <main
                id="viewport"
                className="viewport viewport_surah"
              >
                <SubjectiveList
                  chapters={chapters}
                  subjectives={subjectives}
                  contentTitle="Subjective"
                />
              </main>

              {/* <AudioPlayer /> */}

              <FooterWeb />
              <FooterMobile />
            </SidenavContextProvider>
          </AudioPlayerContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
}

export async function getStaticProps() {
  const chaptersInfo = await getChaptersInfo();
  const subjectives = await getSubjectives();

  return {
    props: {
      subjectives: subjectives,
      chapters: chaptersInfo,
    },
  };
}
