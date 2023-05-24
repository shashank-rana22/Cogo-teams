import React from 'react';

import Header from './Header';
import RiskProneShipments from './RiskProneShipments';
import styles from './styles.module.css';

function RiskMangement() {
	return (
		<div>
			<div className={styles.header}>Risk Mangement</div>
			<Header />
			<RiskProneShipments />
		</div>
	);
}

export default RiskMangement;
