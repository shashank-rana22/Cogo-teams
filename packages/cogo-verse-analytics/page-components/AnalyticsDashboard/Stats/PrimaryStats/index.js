import { Placeholder } from '@cogoport/components';
import React from 'react';

import { PRIMARY_STATS } from '../../../../configurations/primary-stats';
import { handleValues } from '../../../../utils/handleValues';

import styles from './styles.module.css';

function PrimaryStats(props = {}) {
	const {
		stats = {},
		statsLoading = false,
		userStats = {},
		firebaseLoading = false,
	} = props || {};
	const statsData = stats?.list || {};

	return (
		<div className={styles.primary_stats}>

			<div className={styles.primary_left}>
				{PRIMARY_STATS.map((stat) => {
					const {
						valueKey, descKey, title, icon, icon_bg, description,
					} = stat;

					return (
						<div className={styles.left_stat_content}>
							<div className={styles.primary_left_stat}>

								<div className={styles.primary_stat_title}>
									<div className={styles.primary_stat_value}>

										{!statsLoading
											? handleValues(statsData[valueKey] || '0')
											: (
												<Placeholder
													className={styles.placeholder_element}
													height="20px"
													width="25px"
												/>
											)}
									</div>

									{' '}
									{title}
								</div>
								<div className={styles.primary_stat_description}>
									From
									{' '}
									<span>
										{ !statsLoading
											? statsData[descKey] || '0'
											: (
												<Placeholder
													className={styles.placeholder_element}
													height="15px"
													width="20px"
												/>
											)}

									</span>

									{' '}
									{description}
								</div>
							</div>
							<div className={styles.primary_left_icon} style={{ background: icon_bg }}>
								{icon}
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.primary_right}>
				<div className={styles.ticket_container}>
					<div className={styles.right_stat_title}> Users Active on</div>
					<div className={styles.detail}>
						<div className={styles.ticket_details}>

							<div className={styles.ticket_label}>
								CogoVerse AI
							</div>
							<div className={styles.ticket_value}>
								{!firebaseLoading
									? handleValues(userStats?.ai_chats)
									: (
										<Placeholder
											className={styles.placeholder_element}
											height="15px"
											width="30px"
										/>
									)}

							</div>
						</div>
						<div className={styles.ticket_details}>

							<div className={styles.ticket_label}>
								Customer Support
							</div>
							<div className={styles.ticket_value}>
								{!firebaseLoading ? handleValues(userStats?.kam_chats)
									: (
										<Placeholder
											className={styles.placeholder_element}
											height="15px"
											width="30px"
										/>
									)}

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PrimaryStats;
