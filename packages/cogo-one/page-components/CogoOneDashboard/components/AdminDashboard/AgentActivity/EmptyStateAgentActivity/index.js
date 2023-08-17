import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const NO_OF_HORIZONTAL_LINE = 5;

function EmptyStateAgentActivity() {
	return (
		<div className={styles.empty_state}>
			<div className={styles.empty_image_container}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_chart}
					alt="Empty State"
					className={styles.empty_state_icon}
					width={100}
					height={100}
				/>
			</div>
			{[...Array(NO_OF_HORIZONTAL_LINE).keys()].map((key) => (
				<div className={styles.horizontal_line} key={key} />

			))}
		</div>
	);
}

export default EmptyStateAgentActivity;
