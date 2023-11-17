import React from 'react';

import CallsMadeStats from './CallsMadeStats';
import CallsReceivedStats from './CallsReceivedStats';
import ReceivedStats from './ReceivedStats';
import SentStats from './SentStats';
import styles from './styles.module.css';

function ChannelStats({
	channelType = '',
	filterParams = {},
}) {
	if (channelType === 'calls') {
		return (
			<div className={styles.container}>
				<CallsMadeStats
					channelType={channelType}
					filterParams={filterParams}
				/>
				<CallsReceivedStats
					channelType={channelType}
					filterParams={filterParams}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<SentStats
				channelType={channelType}
				filterParams={filterParams}
			/>
			<ReceivedStats
				channelType={channelType}
				filterParams={filterParams}
			/>
		</div>
	);
}

export default ChannelStats;
