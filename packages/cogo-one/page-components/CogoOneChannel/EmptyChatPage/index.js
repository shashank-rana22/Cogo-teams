import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const MESSAGE_MAPPING = {
	message : 'chat',
	voice   : 'call log',
	mail    : 'mail',
};

function EmptyChatPage({ activeTab = {} }) {
	const displayMessage = MESSAGE_MAPPING[activeTab?.tab] || activeTab?.tab;

	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_chat_jpg}
				alt="-"
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
