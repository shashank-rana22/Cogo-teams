import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import React, { useContext } from 'react';

import useGetShipmentInvoice from '../../hooks/useGetShipmentInvoice';
import useListBfSalesInvoices from '../../hooks/useListBfSalesInvoices';
import useListSageSalesInvoices from '../../hooks/useListSageSalesInvoices';
import useOrgOutStanding from '../../hooks/useOrgOutStanding';
import OverviewManageServices from '../Overview/OverviewManageServices';

import Loader from './commons/Loader';
import Invoices from './Invoices';
import styles from './styles.module.css';

function SalesInvoice() {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const { list } = useListSageSalesInvoices();
	const { salesList, refetch:salesInvoicesRefetch } = useListBfSalesInvoices();

	const { data: invoiceData, groupedInvoices, refetch, loading } = useGetShipmentInvoice();

	const { outstanding_by_reg_num } = useOrgOutStanding({
		org_reg_nums: Object.keys(groupedInvoices || {}),
	});

	const isIRNGenerated = !!list.find((item) => !!item.irn_number);

	let salesInvoices = null;
	if (loading) {
		salesInvoices = (
			<div>
				<Loader />
				<Loader />
				<Loader />
			</div>
		);
	} else if (isEmpty(invoiceData) && !loading) {
		salesInvoices = null;
	} else {
		(
			salesInvoices =	(
				<Invoices
					shipmentData={shipment_data}
					invoiceData={invoiceData}
					groupedInvoices={groupedInvoices}
					refetch={refetch}
					invoicesList={salesList}
					loading={loading}
					salesInvoicesRefetch={salesInvoicesRefetch}
					isIRNGenerated={isIRNGenerated}
					outstanding_by_reg_num={outstanding_by_reg_num}
				/>
			)
		);
	}

	return (
		<main className={styles.container}>
			<OverviewManageServices />
			{salesInvoices}
		</main>
	);
}

export default SalesInvoice;
