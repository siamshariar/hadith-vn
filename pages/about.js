import { server } from '../lib/config'
import { getChaptersInfo } from '../lib/fetch'
//import { useState } from 'react'
import SettingsContextProvider from '../contexts/SettingsContext'
import Meta from '../components/core/meta'
//import SearchModal from '../components/core/search-modal'
import HeaderWeb from '../components/layout2/web/header'
import HeaderMobile from '../components/mobile/header-content'
import FooterWeb from '../components/web/footer'
//import FooterMobile from '../components/mobile/footer-home'
import Sidenav from '../components/layout2/sidenav'
import AboutContent from '../components/pages/about'
import PinContextProvider from '../contexts/PinContext'
import BookmarkContextProvider from '../contexts/BookmarkContext'
import SidenavContextProvider from '../contexts/SidenavContext'

export default function AboutPage({ chapters }) {
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
				title={`About`}
				description={`Quran application in Vietnamese`}
				url={`${server}/about`}
				image={`${server}/img/s_logo.png`}
				type="website"
			/>

			{/* <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            /> */}

			{/* <Sidenav chapters={chapters} /> */}

			<HeaderWeb
				page="surah"
        chapters={chapters}
        isChapterPage={true}
				//searchModalController={searchModalController}
			/>

			<HeaderMobile
				//searchModalController={searchModalController}
				title="About"
			/>

			<main id="viewport" className="viewport viewport_no_footer">
				<div className="content layout2">

					<Sidenav chapters={chapters} />

					<div className="content_wrapper">
						<AboutContent />
					</div>
				</div>
			</main>

			 <FooterWeb />

			{/* <FooterMobile /> */}
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