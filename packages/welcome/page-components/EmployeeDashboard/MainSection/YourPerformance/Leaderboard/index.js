import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Leaderboard() {
	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div>
					Story Points Leaderboard
				</div>
				<div className={styles.view_all}>
					View All
					{' '}
					<IcMArrowRight style={{ marginLeft: 4 }} />
				</div>
			</div>
			<div className={styles.leaderboard_users}>
				<div className={styles.rank_user}>
					<div className={styles.rank_2}>
						V
					</div>
					<div className={styles.rank_2_count}>
						2
					</div>
					<div className={styles.user_name}>
						Vatani
					</div>
					24
				</div>
				<div className={styles.rank_user}>
					<div className={styles.rank_1}>
						V
					</div>
					<div className={styles.rank_1_count}>
						1
					</div>
					<div className={styles.user_name}>
						Vatani
					</div>
					24
				</div>
				<div className={styles.rank_user}>
					<div className={styles.rank_3}>
						V
					</div>
					<div className={styles.rank_3_count}>
						3
					</div>
					<div className={styles.user_name}>
						Vatani
					</div>
					24
				</div>
			</div>
		</div>
	);
}

export default Leaderboard;
