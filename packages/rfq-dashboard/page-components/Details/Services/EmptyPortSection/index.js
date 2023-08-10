import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

function EmptyPortsSection() {
	return (
		<div className={styles.container}>
			<img
				src={GLOBAL_CONSTANTS.image_url.empty_port}
				alt="empty port"
				className={styles.empty_chat_image}
			/>
		</div>
	);
}

export default EmptyPortsSection;
