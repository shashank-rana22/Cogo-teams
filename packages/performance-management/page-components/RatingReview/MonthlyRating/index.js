import { IcCStarfull } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function MonthlyRating() {
	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<div className={styles.header}>
					<div>
						<div className={styles.title}>September ratings</div>
						<div className={styles.sub_title}>Please rate your employees as you see fit</div>
					</div>
					<div>
						<IcCStarfull />
						Team Rating
					</div>
				</div>
			</div>
		</div>
	);
}

export default MonthlyRating;
