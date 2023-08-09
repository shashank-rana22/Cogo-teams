import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { CHANNEL_STATS } from '../../configurations/channel-message-analytic-data';

import styles from './styles.module.css';

function ChannelMessageAnalytic({ loading = false, messages = [] }) {
	const channelStats = CHANNEL_STATS.map((val) => {
		const { key } = val;
		const channelPresent = messages.find((item) => item?.type === key);
		const customer = channelPresent ? channelPresent?.customer : null;

		return {
			...val,
			customer,
		};
	});

	return (
		<div className={styles.statistics}>
			<div className={styles.heading}>Channels Messages Analytics</div>
			<div className={styles.socoal_icons_and_data_list}>
				{(channelStats || []).map((stat) => {
					const { key, channel, static_data, icon, customer } = stat;

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
										{customer || GLOBAL_CONSTANTS.zeroth_index}
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
