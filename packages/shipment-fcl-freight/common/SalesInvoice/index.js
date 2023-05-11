import React from 'react';

import OverviewManageServices from '../Overview/OverviewManageServices';

import Invoices from './Invoices';
import styles from './styles.module.css';

function SalesInvoice({ shipmentData = {} }) {
	return (
		<main className={styles.container}>
			<OverviewManageServices />
			<Invoices shipmentData={shipmentData} />
		</main>
	);
}

export default SalesInvoice;
