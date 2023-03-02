/* eslint-disable max-len */
import { Placeholder } from '@cogoport/components';
import React from 'react';

import { STATS } from '../../configurations/dummyStatisticsData';

import styles from './styles.module.css';

function Statistics({ loading = false, callsAnalytics, channels_message_analytics }) {
	const apiData = {
		callsAnalytics,
		channels_message_analytics,
	};
	return (
		<>
			{STATS.map((item) => {
				const { key, calls, channel } = item;
				console.log('🚀 ~  key:', key);

				return (
					<div className={styles.statistics}>
						<div className={styles.heading}>
							{calls.config.label}
						</div>
						{/* ---------------- */}
						<div className={styles.time_durations_section}>
							{
							calls?.data?.map((itm) => {
								const itemKey = itm?.key;
								console.log('🚀  ~ itemKey:', itemKey);
								return (
									<div className={styles.time_durations}>
										{loading
											? <Placeholder height="15px" width="60px" className={styles.duration_placeholder} />
											: (
												<div
													className={styles.time_durations_header}
												>
													<span className={styles.time_durations_value}>{(apiData?.[key]?.[itemKey] || 0) >= 60 ? ((apiData[key][itemKey] || 0) / 60).toFixed(2) : (apiData?.[key]?.[itemKey] || 0)}</span>
													{' '}
													<span>{(apiData?.[key]?.[itemKey] || 0) >= 60 ? 'hr' : 'min'}</span>
												</div>
											)}

										<div className={styles.time_durations_text}>{itm.label}</div>
									</div>
								);
							})
						}

						</div>
						{/* ---------------- */}

						<div className={styles.socoal_icons_and_data_list}>
							{
							channel.map((stat) => (
								<div className={styles.socoal_icons_and_data}>
									<div className={styles.social_icons_and_its_name}>

										{stat.icon}

										<div className={styles.social_name}>{stat.channel}</div>

									</div>

									{loading
										? <Placeholder height="15px" width="100px" className={styles.customer_nos_placeholder} />
										: (
											<div className={styles.customer_nos}>
												<span>{stat.customer_nos}</span>
												{' '}
												<span>{stat.static_data}</span>
											</div>
										)}

								</div>
							))
						}

						</div>

					</div>
				);
			})}

		</>
	);
}
export default Statistics;
