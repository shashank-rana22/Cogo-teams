import React from 'react';

import GlobalRules from './GlobalRules';
import KYCRule from './KYCRule';
import ShipmentRule from './ShipmentRule';
import styles from './styles.module.css';
import SubscriptionRule from './SubscriptionRule';

function Configuration() {
	return (
		<div>
			<div className={styles.heading}>Referral- Configuration</div>
			<KYCRule />
			<ShipmentRule />
			<SubscriptionRule />
			<GlobalRules />
		</div>
	);
}

export default Configuration;
