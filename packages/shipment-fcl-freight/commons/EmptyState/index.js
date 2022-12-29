import { IcMAverage } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({
	isMobile = false,
	showContent = {
		heading     : 'No Results Found!',
		description : 'Looks like you do not have any records for this section',
	},
}) {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>{showContent.heading}</div>

				<div className={styles.content}>{showContent.description}</div>
			</div>

			{!isMobile ? (
				<div
					className={styles.empty_state_icon}
				>
					<IcMAverage width={120} height={120} />
				</div>
			) : null}
		</div>
	);
}

export default EmptyState;
