import React from 'react';

import AgentsExceptionList from './AgentsExceptionList';
import Analytics from './Analytics';
import ChannelStats from './ChannelStats';
import PerAgentData from './PerAgentData';
import RevenueContainer from './RevenueContainer';
import styles from './styles.module.css';
import UserData from './UserData';

const CHANNELS = ['email', 'whatsapp', 'calls'];

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

			<AgentsExceptionList />
		</div>
	);
}

export default SmeComponents;
