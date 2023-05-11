import React from 'react';

import OverviewManageServices from '../Overview/OverviewManageServices';
import useGetShipmentInvoice  from './Hooks/useGetShipmentInvoice';
import Invoices from './Invoices';
import styles from './styles.module.css';

function SalesInvoice({ shipmentData = {} }) {
	const {loading, data: invoiceData, groupedInvoices} = useGetShipmentInvoice({payload: {
		shipment_id: shipmentData?.id,
		performed_by_org_id: '26f025cd-a0b7-4938-9588-dd83fabce66c'
	}});
	
	return (
		<main className={styles.container}>
			<OverviewManageServices />
			<Invoices shipmentData={shipmentData} invoiceData={invoiceData} groupedInvoices={groupedInvoices}/>
		</main>
	);
}

export default SalesInvoice;
