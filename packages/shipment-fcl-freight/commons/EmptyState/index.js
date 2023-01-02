import { IcMAverage } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({
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

			<div
				className={styles.empty_state_icon}
			>
				<IcMAverage width={90} height={90} />
			</div>
		</div>
	);
}

export default EmptyState;
