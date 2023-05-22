import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import useListBfSalesInvoices from '../../../hooks/useListBfSalesInvoices';
import useListCreditNotes from '../../../hooks/useListCreditNotes';
import useOrgOutStanding from '../../../hooks/useOrgOutStanding';
import CreditNote from '../CreditNote';
import { POST_REVIEWED_INVOICES } from '../helpers/post-reviewed-sales-invoices.json';

import Header from './Header';
import InvoiceItem from './InvoiceItem';
import styles from './styles.module.css';

function Invoices({
	invoiceData = {},
	groupedInvoices = {},
	loading = false,
	salesInvoicesRefetch = () => {},
	isCustomer = false,
	isIRNGenerated = false,
}) {
	const { outstanding_by_reg_num } = useOrgOutStanding({ org_reg_nums: Object.keys(groupedInvoices || {}) });
	const { salesList : invoicesList, refetch: bfInvoiceRefetch } = useListBfSalesInvoices();
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

	const { list, cnRefetch, loading: cNLoading } = useListCreditNotes({});

	return (
		<main className={styles.container}>
			<Header
				invoiceData={invoiceData}
				bfInvoiceRefetch={bfInvoiceRefetch}
				disableAction={disableAction}
				isCustomer={isCustomer}
				salesInvoicesRefetch={salesInvoicesRefetch}
			/>

			<div className={styles.line} />

			<section>
				{Object.keys(groupedInvoices || {}).map((item) => (
					<InvoiceItem
						key={item}
						item={groupedInvoices[item]}
						total={totals?.[item]}
						bfInvoiceRefetch={bfInvoiceRefetch}
						loading={loading}
						invoiceData={invoiceData}
						invoicesList={invoicesList}
						isIRNGenerated={isIRNGenerated}
						org_outstanding={outstanding_by_reg_num[item]}
						salesInvoicesRefetch={salesInvoicesRefetch}
						refetchCN={cnRefetch}
					/>
				))}
			</section>

			{list?.length
				? (
					<CreditNote
						cnRefetch={cnRefetch}
						list={list}
						loading={cNLoading}
						invoiceData={invoiceData}
						invoicesList={invoicesList}
					/>
				) : null}
		</main>
	);
}

export default Invoices;
