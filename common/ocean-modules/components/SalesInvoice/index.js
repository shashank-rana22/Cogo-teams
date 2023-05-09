import OverviewManageServices from '@cogoport/shipment-fcl-freight/common/Overview/OverviewManageServices';
import React from 'react';

import Invoices from './InvoiceList';
import styles from './styles.module.css';

function SalesInvoice({ shipmentData = {} }) {
	return (
		<div className={styles.container}>
			<OverviewManageServices />
			<Invoices shipmentData={shipmentData} />
		</div>
	);
}

export default SalesInvoice;
