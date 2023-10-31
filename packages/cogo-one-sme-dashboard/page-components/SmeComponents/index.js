import React from 'react';

import Analytics from './Analytics';
import PerAgentData from './PerAgentData';
import RevenueContainer from './RevenueContainer';
import styles from './styles.module.css';
import UserData from './UserData';

function SmeComponents() {
	return (
		<div className={styles.container}>
			<RevenueContainer />
			<PerAgentData />
			<Analytics />
			<UserData />
			<Analytics />
			<UserData />
		</div>
	);
}

export default SmeComponents;
