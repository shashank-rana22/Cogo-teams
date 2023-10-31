import React from 'react';

import ReceivedStats from './ReceivedStats';
import SentStats from './SentStats';
import styles from './styles.module.css';

function ChannelStats({ channelType = '' }) {
	return (
		<div className={styles.container}>
			<SentStats channelType={channelType} />
			<ReceivedStats />
		</div>
	);
}

export default ChannelStats;
