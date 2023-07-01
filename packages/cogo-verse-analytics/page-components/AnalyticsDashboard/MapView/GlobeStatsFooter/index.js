import { Placeholder } from '@cogoport/components';
import React from 'react';

import { CONVERSATIONS } from '../../../../configurations/primary-stats';
import { PIE_ICON } from '../../../../constants/monitoring';
import { handleValues } from '../../../../utils/handleValues';
import CommunicationPieChart from '../PieChart';

import styles from './styles.module.css';

function GlobeStatsFooter(props = {}) {
	const {
		stats = {},
		statsLoading = false,
	} = props || {};
	const statsData = stats?.list || {};
	return (
		<div className={styles.footer_stats}>
			<div className={styles.communication_stats}>
				<div className={styles.left_stats}>
					{
							CONVERSATIONS.map(({ valueKey, title, icon_bg }) => (
								<div className={styles.the_stat}>
									<div className={styles.stat_circle} style={{ background: icon_bg }} />
									<div className={styles.com_stat_value}>
										{!statsLoading
											? handleValues(statsData[valueKey] || '0')
											: (
												<Placeholder
													className={styles.placeholder_element}
													height="20px"
													width="30px"
												/>
											)}
									</div>

									<div className={styles.stat_description}>{title}</div>
								</div>
							))
						}

				</div>

				<div className={styles.pie_chart}>
					{
							!statsLoading
								? <CommunicationPieChart conversation_data={statsData} />
								: (
									<div className={styles.loading_pie_chart}>
										<Placeholder
											className={styles.placeholder_element}
											height="70%"
											width="70%"
										>
											{PIE_ICON}
										</Placeholder>
									</div>
								)

						}

				</div>

			</div>
		</div>
	);
}

export default GlobeStatsFooter;
