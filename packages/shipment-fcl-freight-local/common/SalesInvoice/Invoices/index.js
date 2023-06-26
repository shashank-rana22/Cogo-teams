import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import useGetCreditNotes from '../../../hooks/useGetCreditNotes';
import useListBfSalesInvoices from '../../../hooks/useListBfSalesInvoices';
import useOrgOutStanding from '../../../hooks/useOrgOutStanding';
import CreditNote from '../CreditNote';
import POST_REVIEWED_INVOICES from '../helpers/post-reviewed-sales-invoices';

import Header from './Header';
import InvoiceItem from './InvoiceItem';
import styles from './styles.module.css';

const INITIAL_STATE_OF_COUNT = 0;
const TOTAL_COUNT = 1;

function Invoices({
	invoiceData = {},
	groupedInvoices = {},
	loading = false,
	salesInvoicesRefetch = () => {},
	isIRNGenerated = false,
}) {
	const { OUTSTANDING_BY_REG_NUM } = useOrgOutStanding({ org_reg_nums: Object.keys(groupedInvoices || {}) });
	const { salesList : invoicesList, refetch: bfInvoiceRefetch } = useListBfSalesInvoices();
	const { shipment_data } = useContext(ShipmentDetailContext);
	const totals = invoiceData?.invoicing_party_wise_total;

	const invoiceStatuses = invoiceData?.invoicing_parties?.map(
		(item) => item?.status,
	);

	let count = INITIAL_STATE_OF_COUNT;
	invoiceStatuses.forEach((item) => {
		if (POST_REVIEWED_INVOICES.includes(item)) {
			count += TOTAL_COUNT;
		}
	});
	let disableAction = isEmpty(invoiceData?.invoice_trigger_date);
	if (invoiceStatuses.length === count) {
		disableAction = true;
	}

	const showForOldShipments = invoiceData?.invoice_trigger_date
	&& shipment_data?.serial_id <= GLOBAL_CONSTANTS.invoice_check_id
	&& !invoiceStatuses.some((ele) => ['reviewed', 'approved'].includes(ele));

	disableAction = showForOldShipments ? false : disableAction;

	const { list, cnRefetch, loading: cnLoading } = useGetCreditNotes();

	return (
		<main className={styles.container}>
			<Header
				invoiceData={invoiceData}
				bfInvoiceRefetch={bfInvoiceRefetch}
				disableAction={disableAction}
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
						org_outstanding={OUTSTANDING_BY_REG_NUM[item]}
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
						loading={cnLoading}
						invoiceData={invoiceData}
						invoicesList={invoicesList}
					/>
				) : null}
		</main>
	);
}

export default Invoices;
