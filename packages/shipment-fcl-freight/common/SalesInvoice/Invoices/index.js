import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import useGetCreditNotes from '../../../hooks/useGetCreditNotes';
import useGetCrossEntityCreditNotes from '../../../hooks/useGetCrossEntityCreditNotes';
import useListBfSalesInvoices from '../../../hooks/useListBfSalesInvoices';
import useOrgOutStanding from '../../../hooks/useOrgOutStanding';
import CreditNote from '../CreditNote';
import CrossEntityCreditNote from '../CrossEntityCreditNote';
import POST_REVIEWED_INVOICES from '../helpers/post-reviewed-sales-invoices';

import Header from './Header';
import InvoiceItem from './InvoiceItem';
import styles from './styles.module.css';

const INCREMENT_IN_COUNT_BY_FOR_POST_REVIEW_STATUS = 1;
const START_COUNT = 0;

function Invoices({
	invoiceData = {},
	invoiceDataCE = {},
	groupedInvoices = {},
	groupedInvoicesCE = {},
	loading = false,
	loadingCE = false,
	salesInvoicesRefetch = () => {},
	isCustomer = false,
	isIRNGenerated = false,
}) {
	const { OUTSTANDING_BY_REG_NUM } = useOrgOutStanding({ org_reg_nums: Object.keys(groupedInvoices || {}) });
	const { salesList : invoicesList, refetch: bfInvoiceRefetch } = useListBfSalesInvoices();
	const { shipment_data } = useContext(ShipmentDetailContext);
	const totals = invoiceData?.invoicing_party_wise_total;
	const totalsCE = invoiceDataCE?.invoicing_party_wise_total;

	const invoiceStatuses = invoiceData?.invoicing_parties?.map(
		(item) => item?.status,
	);

	let count = START_COUNT;
	invoiceStatuses.forEach((item) => {
		if (POST_REVIEWED_INVOICES.includes(item)) {
			count += INCREMENT_IN_COUNT_BY_FOR_POST_REVIEW_STATUS;
		}
	});
	let disableAction = isEmpty(invoiceData?.invoice_trigger_date);
	if (invoiceStatuses.length === count) {
		disableAction = true;
	}

	const showForOldShipments = invoiceData?.invoice_trigger_date
	&& shipment_data?.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& !invoiceStatuses.some((ele) => ['reviewed', 'approved'].includes(ele));

	disableAction = showForOldShipments ? false : disableAction;

	const { list, cnRefetch, loading: cNLoading } = useGetCreditNotes({});

	const { CECreditNoteData, loadingCECN } = useGetCrossEntityCreditNotes();

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
						org_outstanding={OUTSTANDING_BY_REG_NUM?.[item]}
						salesInvoicesRefetch={salesInvoicesRefetch}
						refetchCN={cnRefetch}
					/>
				))}
			</section>

			<section>
				{Object.keys(groupedInvoicesCE || {}).map((item) => (
					<InvoiceItem
						key={item}
						item={groupedInvoicesCE[item]}
						total={totalsCE?.[item]}
						loading={loadingCE}
						invoiceData={invoiceDataCE}
						invoicesList={invoicesList}
						isCrossEntity
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

			{!isEmpty(CECreditNoteData) ? (
				<CrossEntityCreditNote
					loading={loadingCECN}
					list={CECreditNoteData}
					invoicesList={invoicesList}
				/>
			) : null}

		</main>
	);
}

export default Invoices;
