import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { CHANNEL_MESSAGE_ANALYTICS_MAPPING_DATA } from '../../configurations/channel-message-analytic-data';

import styles from './styles.module.css';

const MAXIMUMN_MINUTE_VALUE = 60;
const MIN_ROUND_UP = 2;

function ChannelMessageAnalytic({ loading = false, channelsMessageAnalytics = {} }) {
	const { calls = [], channel = [] } = CHANNEL_MESSAGE_ANALYTICS_MAPPING_DATA;

	return (
		<div className={styles.statistics}>
			<div className={styles.heading}>Channels Messages Analytics</div>
			<div className={styles.time_durations_section}>
				{(calls || []).map((itm) => {
					const itemKey = itm?.key;

					return (
						<div className={styles.time_durations} key={itemKey}>
							{loading
								? <Placeholder height="15px" width="60px" className={styles.placeholder} />
								: (
									<div
										className={styles.time_durations_header}
									>
										<span className={styles.time_durations_value}>
											{(channelsMessageAnalytics[itemKey]
											|| GLOBAL_CONSTANTS.zeroth_index) >= MAXIMUMN_MINUTE_VALUE
												? ((channelsMessageAnalytics[itemKey]
													|| GLOBAL_CONSTANTS.zeroth_index)
													/ MAXIMUMN_MINUTE_VALUE).toFixed(MIN_ROUND_UP)
												: (channelsMessageAnalytics[itemKey] || GLOBAL_CONSTANTS.zeroth_index)}
										</span>
										{' '}
										<span>
											{(channelsMessageAnalytics?.[itemKey]
											|| GLOBAL_CONSTANTS.zeroth_index) >= MAXIMUMN_MINUTE_VALUE ? 'hr' : 'min'}

										</span>
									</div>
								)}
							<div className={styles.time_durations_text}>{itm.label}</div>
						</div>
					);
				})}
			</div>

			<div className={styles.socoal_icons_and_data_list}>
				{(channel || []).map((stat) => (
					<div className={styles.socoal_icons_and_data} key={stat.key}>
						<div className={styles.social_icons_and_its_name}>
							{stat.icon}
							<div className={styles.social_name}>{stat.channel}</div>
						</div>
						{loading
							? <Placeholder height="15px" width="100px" className={styles.placeholder} />
							: (
								<div className={styles.customer_nos}>
									<span>{channelsMessageAnalytics?.[stat.key] || GLOBAL_CONSTANTS.zeroth_index}</span>
									<span>{stat.static_data}</span>
								</div>
							)}
					</div>
				))}
			</div>
		</div>
	);
}
export default ChannelMessageAnalytic;
