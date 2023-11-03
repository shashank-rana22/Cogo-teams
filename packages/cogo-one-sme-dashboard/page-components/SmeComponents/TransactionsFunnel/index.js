import React from 'react';

import CustomerBased from './CustomerBased';
import CustomerInteractionFunnel from './CustomerInteractionFunnel';
import ServiceBased from './ServiceBased';
import ServicesWiseBifurcation from './ServicesWiseBifurcation';
import styles from './styles.module.css';

function TransactionsFunnel() {
	return (
		<>
			<div className={styles.header}>
				Transaction Funnel
			</div>
			<CustomerBased />
			<ServiceBased />
			<CustomerInteractionFunnel />
			<ServicesWiseBifurcation />
		</>
	);
}

export default TransactionsFunnel;
