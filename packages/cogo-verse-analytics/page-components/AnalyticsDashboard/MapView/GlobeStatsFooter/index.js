import { Placeholder } from '@cogoport/components';
import { IcMHourglass } from '@cogoport/icons-react';
import React from 'react';

import { CONVERSATIONS } from '../../../../configurations/primary-stats';
import { PIE_ICON } from '../../../../constants/monitoring';
import { handleValues } from '../../../../utils/handleValues';
import CommunicationPieChart from '../PieChart';

import styles from './styles.module.css';

function GlobeStatsFooter(props = {}) {
	const {
		statsLoading = false,
		chatLoading = false,
		statsData = {},
		platFormChatData = {},
	} = props || {};

	const { conversation_data = {} } = statsData || {};
	const averageResponseTime = Number(platFormChatData?.average_cutomer_response_time) || 0;
	return (
		<div className={styles.footer_stats}>
			<div className={styles.avg_response_time}>
				<div className={styles.response_time_title}>
					Average Customer Response Time
				</div>
				<div className={styles.response_time}>
					<div className={styles.time}>
						{
								chatLoading
									? (
										<Placeholder
											className={styles.placeholder_element}
											height="40px"
											width="75px"
										/>
									)
									: (
										<>
											<span>
												{averageResponseTime < 60
													? averageResponseTime

													:	(averageResponseTime / 60).toFixed(1)}
											</span>
											{' '}
											{averageResponseTime < 60
												? 'min'

												:	'hrs'}

										</>
									)
							}

					</div>

					<div className={styles.arrow_img}>
						<IcMHourglass width="30px" height="30px" fill="#C4DC91" />
					</div>
				</div>

			</div>

			<div className={styles.communication_stats}>
				<div className={styles.left_stats}>
					{
							CONVERSATIONS.map(({ valueKey, title, icon_bg }) => (
								<div className={styles.the_stat}>
									<div className={styles.stat_circle} style={{ background: icon_bg }} />
									<div className={styles.com_stat_value}>
										{!statsLoading
											? handleValues(conversation_data[valueKey] || '0')
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
								? <CommunicationPieChart conversation_data={conversation_data} />
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
