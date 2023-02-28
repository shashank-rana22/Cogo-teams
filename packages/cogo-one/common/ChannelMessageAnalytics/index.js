/* eslint-disable max-len */
import { Placeholder } from '@cogoport/components';
import React from 'react';

import { channelMessageAnayticsData } from '../../configurations/dummyChannelMessageAnalyticData';

import styles from './styles.module.css';

function ChannelMessageAnalytic({ loading = true, channels_message_analytics }) {
	const { calls, channel } = channelMessageAnayticsData;
	return (
		<div className={styles.statistics}>
			<div className={styles.heading}>
				Channels Messages Analytics
			</div>
			{/* ---------------- */}
			<div className={styles.time_durations_section}>
				{
							calls?.map((itm) => {
								const itemKey = itm?.key;
								return (
									<div className={styles.time_durations}>
										{loading
											? <Placeholder height="15px" width="60px" className={styles.duration_placeholder} />
											: (
												<div
													className={styles.time_durations_header}
												>
													<span className={styles.time_durations_value}>{(channels_message_analytics?.[itemKey] || 0) >= 60 ? ((channels_message_analytics[itemKey] || 0) / 60).toFixed(2) : (channels_message_analytics[itemKey] || 0)}</span>
													{' '}
													<span>{(channels_message_analytics?.[itemKey] || 0) >= 60 ? 'hr' : 'min'}</span>
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
												<span>{channels_message_analytics?.[stat.key]}</span>
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
}
export default ChannelMessageAnalytic;
