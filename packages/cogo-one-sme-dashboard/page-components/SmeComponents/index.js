import React from 'react';

import Analytics from './Analytics';
import ChannelStats from './ChannelStats';
import PerAgentData from './PerAgentData';
import RevenueContainer from './RevenueContainer';
import styles from './styles.module.css';
import UserData from './UserData';

const CHANNELS = ['whatsapp', 'email'];

function SmeComponents() {
	return (
		<div className={styles.container}>
			<RevenueContainer />
			<PerAgentData />
			<Analytics />
			<UserData />
			{CHANNELS.map((itm) => (
				<ChannelStats
					channelType={itm}
					key={itm}
				/>
			))}
		</div>
	);
}

export default SmeComponents;
