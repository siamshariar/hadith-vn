import { server } from '../lib/config'
import { getChaptersInfo } from '../lib/fetch'
//import { useState } from 'react'
import SettingsContextProvider from '../contexts/SettingsContext'

import Meta from '../components/core/meta'
//import Viewport from '../components/core/viewport'
//import SearchModal from '../components/core/search-modal'
import HeaderWeb from '../components/layout2/web/header'
import HeaderMobile from '../components/mobile/header-home'
import FooterWeb from '../components/web/footer'
import FooterMobile from '../components/mobile/footer-home'
import Banner from '../components/layout2/home/banner'
import ChapterList from '../components/layout2/home/chapter-list'
import PinContextProvider from '../contexts/PinContext'
import BookmarkContextProvider from '../contexts/BookmarkContext'
import SidenavContextProvider from '../contexts/SidenavContext'

// init()

export default function Home({ chapters }) {
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
                title=""
                description="Quran application in Vietnamese"
                url={server}
                image={`${server}/img/s_logo.png`}
                type="website"
            />

            {/* <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            /> */}

            <HeaderWeb
                page="home"
                chapters={chapters}
                isChapterPage={false}
                // searchModalController={searchModalController}
            />

            <HeaderMobile
                chapters={chapters}
                //searchModalController={searchModalController}
            />

            <main id="viewport" className="viewport">
                <Banner />
                <ChapterList chapters={chapters} />
            </main>

            <FooterWeb />

            <FooterMobile />
            </SidenavContextProvider>
            </BookmarkContextProvider>
          </PinContextProvider>
        </SettingsContextProvider>
    )
}


export async function getStaticProps(context) {
    const chapters = await getChaptersInfo()

    if (!chapters) {
        return {
            notFound: true
        }
    }

    // Pass data to the page via props
    return {
        props: { chapters }
    }
}