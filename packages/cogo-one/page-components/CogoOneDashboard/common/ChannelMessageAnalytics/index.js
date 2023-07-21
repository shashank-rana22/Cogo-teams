import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { CHANNEL_STATS } from '../../configurations/channel-message-analytic-data';

import styles from './styles.module.css';

function ChannelMessageAnalytic({ loading = false, channelsMessageAnalytics = {} }) {
	return (
		<div className={styles.statistics}>
			<div className={styles.heading}>Channels Messages Analytics</div>

			<div className={styles.socoal_icons_and_data_list}>
				{(CHANNEL_STATS || []).map((stat) => {
					const { key, channel, static_data, icon } = stat;

					return (
						<div className={styles.socoal_icons_and_data} key={key}>
							<div className={styles.name}>
								{icon}
								<div className={styles.channel_name}>{channel}</div>
							</div>
							{loading
								? <Placeholder height="15px" width="100px" className={styles.placeholder} />
								: (
									<div className={styles.customer_nos}>
										<span>
											{channelsMessageAnalytics?.[key]
										|| GLOBAL_CONSTANTS.zeroth_index}
										</span>
										<span>{static_data}</span>
									</div>
								)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default ChannelMessageAnalytic;
