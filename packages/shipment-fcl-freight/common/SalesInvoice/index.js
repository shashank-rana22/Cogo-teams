import React from 'react';

import useGetShipmentInvoice from '../../hooks/useGetShipmentInvoice';
import useListBfSalesInvoices from '../../hooks/useListBfSalesInvoices';
import useListSageSalesInvoices from '../../hooks/useListSageSalesInvoices';
import OverviewManageServices from '../Overview/OverviewManageServices';

import Invoices from './Invoices';
import styles from './styles.module.css';

function SalesInvoice({ shipmentData = {} }) {
	const { loading: loadingSageSalesInvoices, list } = useListSageSalesInvoices();
	const { salesList, refetch:salesInvoicesRefetch } = useListBfSalesInvoices(shipmentData);

	const { data: invoiceData, groupedInvoices, refetch, loading } = useGetShipmentInvoice();
	const isIRNGenerated = !!list.find((item) => !!item.irn_number);

	return (
		<main className={styles.container}>
			<OverviewManageServices />
			<Invoices
				shipmentData={shipmentData}
				invoiceData={invoiceData}
				groupedInvoices={groupedInvoices}
				refetch={refetch}
				invoicesList={salesList}
				loading={loading}
				salesInvoicesRefetch={salesInvoicesRefetch}
				isIRNGenerated={isIRNGenerated}
			/>
		</main>
	);
}

export default SalesInvoice;
