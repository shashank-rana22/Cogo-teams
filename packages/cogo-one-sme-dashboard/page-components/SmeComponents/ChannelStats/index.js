import React from 'react';

import CallsMadeStats from './CallsMadeStats';
import CallsReceivedStats from './CallsReceivedStats';
import ReceivedStats from './ReceivedStats';
import SentStats from './SentStats';
import styles from './styles.module.css';

function ChannelStats({ channelType = '' }) {
	if (channelType === 'calls') {
		return (
			<div className={styles.container}>
				<CallsMadeStats />
				<CallsReceivedStats />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<SentStats channelType={channelType} />
			<ReceivedStats channelType={channelType} />
		</div>
	);
}

export default ChannelStats;
