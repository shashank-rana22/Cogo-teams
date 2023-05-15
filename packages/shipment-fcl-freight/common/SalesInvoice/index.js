import React from 'react';

import useGetShipmentInvoice from '../../hooks/useGetShipmentInvoice';
import OverviewManageServices from '../Overview/OverviewManageServices';

import Invoices from './Invoices';
import styles from './styles.module.css';

function SalesInvoice({ shipmentData = {} }) {
	const { data: invoiceData, groupedInvoices, refetch } = useGetShipmentInvoice();
	return (
		<main className={styles.container}>
			<OverviewManageServices />
			<Invoices
				shipmentData={shipmentData}
				invoiceData={invoiceData}
				groupedInvoices={groupedInvoices}
				refetch={refetch}
			/>
		</main>
	);
}

export default SalesInvoice;
