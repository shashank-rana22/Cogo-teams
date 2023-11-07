import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function EmptyList() {
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_event}
				width={100}
				height={80}
				alt="logo"
			/>
			<div className={styles.title}>
				Oops!
			</div>
			<div className={styles.label}>
				No Events Found!
			</div>
		</div>
	);
}

export default EmptyList;
