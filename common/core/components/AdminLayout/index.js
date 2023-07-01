import { cl } from '@cogoport/components';
import getSideBarConfigs from '@cogoport/navigation-configs/side-bar';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';

import AnnouncementModal from './Announcements/AnnouncementModal';
import { LockScreen } from './LockScreen';
import { firebaseConfig } from './LockScreen/configurations/firebase-config';
import useShipmentReminder from './LockScreen/hooks/useGetActivity';
import Navbar from './Navbar';
import TnC from './newTnC';
import styles from './styles.module.css';
import Topbar from './Topbar';
import useFetchPinnedNavs from './useFetchPinnedNavs';
import VoiceCall from './VoiceCall';

const WHITE_BACKGROUND_MAPPING = [
	'/[partner_id]/learning/course',
	'/[partner_id]/learning/course/[course_id]',
	'/[partner_id]/learning/course/introduction',
	'/[partner_id]/learning/course/preview',
];

function AdminLayout({
	children = null, showTopbar = true, topbar = {}, showNavbar = false, navbar = {},
}) {
	const [showMobileNavbar, setShowMobileNavbar] = useState(false);
	const [pinnedNavKeys, setPinnedNavKeys] = useState([]);
	const [announcements, setAnnouncements] = useState([]);

	const {
		user_data,
		pathname,
	} = useSelector(({ profile, general }) => ({
		user_data : profile || {},
		pathname  : general.pathname,
	}));

	const {
		user: { id: user_id = '' },
		partner: partnerData,
		is_in_voice_call:inCall = false, voice_call_recipient_data = {},
	} = user_data;

	const { id: partner_id = '', partner_user_id = '', is_joining_tnc_accepted = '' } = partnerData || {};

	const {
		pinListLoading = false,
	} = useFetchPinnedNavs({ user_id, partner_id, setPinnedNavKeys, setAnnouncements });

	const app = isEmpty(getApps()) ? initializeApp(firebaseConfig) : getApp();
	const firestore = getFirestore(app);

	const { showModal, setShowModal } = useShipmentReminder({
		firestore,
		agentId: user_id,
	});

	const configs = getSideBarConfigs({ userData: user_data, pinnedNavKeys });

	const { nav_items = {} } = configs || {};

	const { partner = [], pinnedNavs = [] } = nav_items || {};

	const isTnCModalVisible = Object.keys(partnerData).includes('is_joining_tnc_accepted')
									&& is_joining_tnc_accepted === false;

	return (
		<div className={cl`
			${styles.container} 
			${showTopbar ? styles.has_topbar : ''} 
			${WHITE_BACKGROUND_MAPPING.includes(pathname) && styles.white_bg}
			${showNavbar ? styles.has_navbar : ''}`}
		>
			{showModal ? <LockScreen agentId={user_id} firestore={firestore} setShowModal={setShowModal} /> : (
				<>
					<main className={styles.children_container}>{children}</main>
					{showTopbar ? (
						<Topbar
							className={topbar.className}
							style={topbar.style}
							logo={topbar.logo}
							onClickMobileNav={() => setShowMobileNavbar((s) => !s)}
							showMobileNav={showNavbar}
							showMobileNavbar={showMobileNavbar}
						/>
					) : null}
					{showNavbar ? (
						<Navbar
							className={navbar.className}
							style={navbar.style}
							nav={partner}
							pinListLoading={pinListLoading}
							setPinnedNavKeys={setPinnedNavKeys}
							partner_user_id={partner_user_id}
							pinnedNavs={pinnedNavs}
							mobileShow={showMobileNavbar}
							inCall={inCall}
						/>
					) : null}
					<VoiceCall
						voice_call_recipient_data={{
							...(voice_call_recipient_data || {}),
							loggedInAgentId: user_id,
						}}
						inCall={inCall}
					/>
					<AnnouncementModal data={announcements} />

					{isTnCModalVisible ? <TnC partner_user_id={partner_user_id} /> : null}
				</>
			)}
		</div>
	);
}

export default AdminLayout;
