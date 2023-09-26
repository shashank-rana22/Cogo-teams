import { IcCStarfull } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';
import TableView from './TableView';

function MonthlyRating() {
	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<div className={styles.header}>
					<div>
						<div className={styles.title}>SEPTEMBER RATINGS</div>
						<div className={styles.sub_title}>Please rate your employees as you see fit</div>
					</div>
					<div className={styles.rating_container}>
						Team Rating
						<div className={styles.rating}>
							<IcCStarfull style={{ marginRight: 4 }} height="16px" width="16px" />
							3 stars
						</div>
						Company Average Rating
						<div className={styles.rating}>
							<IcCStarfull style={{ marginRight: 4 }} height="16px" width="16px" />
							2.5 stars
						</div>
					</div>
				</div>

				<div className={styles.remarks}>
					👏 Bravooo! Your team is doing better than most of the company. Keep it Up 🙌
				</div>
				{/* <div className={styles.remarks}>
					👍 Push yourself to do better. Aim to be better than most of the company!
				</div> */}

				<TableView />
			</div>
		</div>
	);
}

export default MonthlyRating;
