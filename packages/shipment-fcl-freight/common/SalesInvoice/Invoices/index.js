import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import React, { useContext } from 'react';

import CreditNote from '../CreditNote';

import Header from './Header';
import InvoiceItem from './InvoiceItem';
import styles from './styles.module.css';

function Invoices({
	invoiceData = {},
	groupedInvoices = {},
	isCustomer = false,
	refetch = () => {},
	loading = false,
	invoicesList = [],
	isIRNGenerated = false,
	outstanding_by_reg_num,
	salesInvoicesRefetch = () => {},
	shipmentData = {},
}) {
	const { shipment_data } = useContext(
		ShipmentDetailContext,
	);

	const id = shipment_data?.id;
	const totals = invoiceData?.invoicing_party_wise_total;

	const invoiceStatuses = invoiceData?.invoicing_parties?.map(
		(item) => item?.status,
	);

	let count = 0;
	invoiceStatuses?.forEach((item) => {
		if (['reviewed', 'approved'].includes(item)) {
			count += 1;
		}
	});

	let disableAction = isEmpty(invoiceData?.invoice_trigger_date);
	if (
		invoiceStatuses?.length === count
		// || invoiceData?.invoice_tat_show !== true
	) {
		disableAction = true;
	}

	// const showForOldShipments =		invoiceData?.invoice_trigger_date
	// 	&& shipment_data?.serial_id <= 120347
	// 	&& !invoiceStatuses?.some((ele) => ['reviewed', 'approved'].includes(ele));

	// disableAction = showForOldShipments ? false : disableAction;

	// const { loadingCreditNotes, data, refetchCN } = useListCreditNotes(id);

	return (
		<main className={styles.container}>
			<Header
				invoiceData={invoiceData}
				isCustomer={isCustomer}
				refetch={refetch}
				shipment_data={shipmentData}
				disableAction={disableAction}
			/>
			<div className={styles.line} />

			<section>
				{/* {Object.keys(groupedInvoices || {}).map((item) => ( */}
				<InvoiceItem
					// item={groupedInvoices[item]}
					// total={totals?.[item]}
					refetch={refetch}
					loading={loading}
					shipment_data={shipmentData}
					invoiceData={invoiceData}
					invoicesList={invoicesList}
					isIRNGenerated={isIRNGenerated}
					// org_outstanding={outstanding_by_reg_num[item]}
					salesInvoicesRefetch={salesInvoicesRefetch}
				/>
				{/* ))} */}
			</section>

			<CreditNote />
		</main>
	);
}

export default Invoices;
