import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import useListCreditNotes from '../../../hooks/useListCreditNotes';
import CreditNote from '../CreditNote';
import POST_REVIEWED_INVOICES from '../helpers/post-reviewed-sales-invoices';

import Header from './Header';
import InvoiceItem from './InvoiceItem';
import styles from './styles.module.css';

function Invoices({
	invoiceData = {},
	groupedInvoices = {},
	refetch = () => {},
	invoicesList = [],
	loading = false,
	salesInvoicesRefetch = () => {},
	outstanding_by_reg_num = {},
	isCustomer = false,
	isIRNGenerated = false,
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const totals = invoiceData?.invoicing_party_wise_total;

	const invoiceStatuses = invoiceData?.invoicing_parties?.map(
		(item) => item?.status,
	);

	let count = 0;
	invoiceStatuses?.forEach((item) => {
		if (POST_REVIEWED_INVOICES.includes(item)) {
			count += 1;
		}
	});
	let disableAction = isEmpty(invoiceData?.invoice_trigger_date);
	if (invoiceStatuses?.length === count) {
		disableAction = true;
	}

	const showForOldShipments = invoiceData?.invoice_trigger_date && shipment_data?.serial_id <= 120347
		&& !invoiceStatuses?.some((ele) => ['reviewed', 'approved'].includes(ele));

	disableAction = showForOldShipments ? false : disableAction;

	const { list, refetch: CNRefetch, loading: CNLoading } = useListCreditNotes({ shipment_data });

	return (
		<main className={styles.container}>
			<Header
				invoiceData={invoiceData}
				refetch={refetch}
				disableAction={disableAction}
				isCustomer={isCustomer}
			/>

			<div className={styles.line} />

			<section>
				{Object.keys(groupedInvoices || {}).map((item) => (
					<InvoiceItem
						key={item}
						item={groupedInvoices[item]}
						total={totals?.[item]}
						refetch={refetch}
						loading={loading}
						invoiceData={invoiceData}
						invoicesList={invoicesList}
						isIRNGenerated={isIRNGenerated}
						org_outstanding={outstanding_by_reg_num[item]}
						salesInvoicesRefetch={salesInvoicesRefetch}
					/>
				))}
			</section>

			{list?.length
				? (
					<CreditNote
						refetch={CNRefetch}
						list={list}
						loading={CNLoading}
						invoiceData={invoiceData}
					/>
				) : null}
		</main>
	);
}

export default Invoices;
