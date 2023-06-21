import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loading() {
	return (
		<div className={styles.container}>
			<div className={styles.stats_container}>
				{[...Array(3)].map((_i, idx) => (
					<Placeholder
						key={`stats_item_placeholder-${idx}`}
						height="32px"
						width="120px"
						margin="4px 36px 0px 0px"
					/>
				))}
			</div>
		</div>
	);
}

export default Loading;
