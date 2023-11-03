import React from 'react';

import AgentsExceptionList from './AgentsExceptionList';
import AgentsPerformanceView from './AgentsPerformanceView';
import Analytics from './Analytics';
import ChannelStats from './ChannelStats';
import CustomerFunnel from './CustomerFunnel';
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

			<CustomerFunnel />

			{CHANNELS.map((itm) => (
				<ChannelStats
					channelType={itm}
					key={itm}
				/>
			))}

			<AgentsExceptionList />
			<AgentsPerformanceView />
		</div>
	);
}

export default SmeComponents;
