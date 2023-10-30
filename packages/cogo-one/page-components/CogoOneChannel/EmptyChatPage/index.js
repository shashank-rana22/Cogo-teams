import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image, dynamic } from '@cogoport/next';
import React from 'react';

import CommonLoader from '../../../common/CommonLoader';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';

import styles from './styles.module.css';

const LeadVoiceCalls = dynamic(() => import('./LeadVoiceCalls'), {
	loading: () => <div className={styles.container}><CommonLoader /></div>,
});

const ShipmentsHomePage = dynamic(() => import('./ShipmentsHomePage'), {
	loading: () => <div className={styles.container}><CommonLoader /></div>,
});

const RateRevertsPage = dynamic(() => import('./RateRevertsPage'), {
	loading: () => <div className={styles.container}><CommonLoader /></div>,
});

const PlatformAdoption = dynamic(() => import('./PlatformAdoption'), {
	loading: () => <div className={styles.container}><CommonLoader /></div>,
});

const MESSAGE_MAPPING = {
	message         : 'chat',
	voice           : 'call log',
	outlook         : 'mail',
	firebase_emails : 'mail',
	teams           : 'Teams',
};

function EmptyChatPage({
	activeTab = {},
	viewType = '',
	setActiveTab = () => {},
	mailProps = {},
	isBotSession = false,
	firestore = {},
	userId = '',
}) {
	const displayMessage = MESSAGE_MAPPING[activeTab?.tab] || activeTab?.tab;

	const showShipments = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_shipments_home_page || false;

	const showLeadVoiceCalls = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_lead_voice_calls || false;

	const showRateReverts = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_rate_reverts_page || false;

	const showPlatformAdoption = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_platform_adoption;

	if (showShipments) {
		return (
			<ShipmentsHomePage
				setActiveTab={setActiveTab}
				viewType={viewType}
				mailProps={mailProps}
			/>
		);
	}

	if (showLeadVoiceCalls) {
		return (
			<LeadVoiceCalls
				setActiveTab={setActiveTab}
			/>
		);
	}

	if (showPlatformAdoption) {
		return (
			<PlatformAdoption
				mailProps={mailProps}
				isBotSession={isBotSession}
				firestore={firestore}
				viewType={viewType}
				userId={userId}
				setActiveTab={setActiveTab}
			/>
		);
	}

	if (showRateReverts) {
		return (
			<RateRevertsPage
				mailProps={mailProps}
				setActiveTab={setActiveTab}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_chat_jpg}
				alt="No chats"
				height={350}
				width={350}
			/>
			<div className={styles.header}>
				Welcome to
				<span className={styles.sub_header}>CogoOne!</span>
			</div>
			<div className={styles.description}>
				You haven&apos;t opened any
				{' '}
				{displayMessage}
				{' '}
				yet, Please select a
				{' '}
				{displayMessage}
			</div>
		</div>
	);
}

export default EmptyChatPage;
