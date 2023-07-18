import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { callAnalyticsStatData } from '../../configurations/call-analytic-data';

import styles from './styles.module.css';

const ONE_MINUTE = 60;
const ROUND_UP = 2;

function CallAnalytics({ loading = false, callsAnalytics = {} }) {
	const { calls = [], channel = [] } = callAnalyticsStatData || {};

	return (
		<div className={styles.statistics}>
			<div className={styles.heading}>Calls Analytics</div>
			<div className={styles.time_durations_section}>
				{(calls || []).map((itm) => {
					const itemKey = itm.key;

					return (
						<div className={styles.time_durations} key={itemKey}>
							{loading
								? <Placeholder height="15px" width="60px" className={styles.placeholder} />
								: (
									<div className={styles.time_durations_header}>
										<span className={styles.time_durations_value}>
											{(callsAnalytics[itemKey] || GLOBAL_CONSTANTS.zeroth_index) >= ONE_MINUTE
												? ((callsAnalytics[itemKey]
													|| GLOBAL_CONSTANTS.zeroth_index) / ONE_MINUTE).toFixed(ROUND_UP)
												: (callsAnalytics[itemKey] || GLOBAL_CONSTANTS.zeroth_index)}
										</span>
										<span>
											{(callsAnalytics[itemKey]
											|| GLOBAL_CONSTANTS.zeroth_index) >= ONE_MINUTE ? 'hr' : 'min'}

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
									<span className={styles.calls_counts}>
										{callsAnalytics?.[stat.key] || GLOBAL_CONSTANTS.zeroth_index}
									</span>
									<span>{stat.static_data}</span>
								</div>
							)}
					</div>
				))}
			</div>
		</div>
	);
}
export default CallAnalytics;
