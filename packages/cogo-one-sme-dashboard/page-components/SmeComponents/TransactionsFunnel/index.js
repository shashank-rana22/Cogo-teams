import React from 'react';

import CustomerBased from './CustomerBased';
import ServiceBased from './ServiceBased';
import styles from './styles.module.css';

function TransactionsFunnel() {
	return (
		<>
			<div className={styles.header}>
				Transaction Funnel
			</div>
			<CustomerBased />
			<ServiceBased />
		</>
	);
}

export default TransactionsFunnel;
