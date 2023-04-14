import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LeaderboardLoading({ leaderboardList = [] }) {
	return (
		<div>
			{leaderboardList?.map((data) => (
				<div
					key={data.id}
					className={styles.card}
				>
					<div className={styles.card_description}>
						<div className={styles.card_description_left}>
							<div>
								<div className={styles.kam_name}>
									<Placeholder width="100px" height="16px" />
								</div>
								<div>
									<Placeholder width="100px" height="16px" />
								</div>
							</div>
						</div>
						<div className={styles.badge_container}>
							<Placeholder
								width="200px"
								height="48px"
								style={{ marginTop: '10px' }}
							/>
						</div>

						<div className={styles.card_description_right}>
							{Array(4).fill('').map(() => (
								<div>
									<div style={{ paddingBottom: '8px' }}>
										<Placeholder
											width="100px"
											height="16px"
											style={{ paddingBottom: '8px' }}
										/>
									</div>
									<div><Placeholder width="100px" height="16px" /></div>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default LeaderboardLoading;
