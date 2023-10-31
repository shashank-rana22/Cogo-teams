import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useListBfPurchaseBills from '../../../../hook/useListBfPurchaseBills';
import useListBfSalesInvoices from '../../../../hook/useListBfSalesInvoices';
import useListShipment from '../../../../hook/useListShipment';
import CostSheetCard from '../CostSheetCard';
import DetailsCard from '../DetailsCard';
import DocumentsCard from '../DocumentsCard';
import TicketsCard from '../TicketsCard/index';

import FinanceClosedCardsSet from './FinanceClosedCardsSet';
import OperationClosedCardsSet from './OperationClosedCardsSet';
import PrePostCheckoutCardsSet from './PrePostCheckoutCardsSet';
import styles from './styles.module.css';

function QuotationCards({
	getPrePostShipmentQuoteRef = {},
	quotationsData = {},
	setQuotationsData = () => {},
}) {
	const { query: { active_tab = '', job_id = '', job_number = '' } } = useRouter();
	const { data: shipmentData = {}, loading: loadingShipment = false } = useListShipment(job_number);
	const dataList = shipmentData?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	const shipmentId = dataList?.id || '';

	const { invoicesMap = {}, invoicesLoading = false } = useListBfSalesInvoices({ jobNumber: job_number });

	const { billsMap = {}, billsLoading = false } = useListBfPurchaseBills({ jobNumbers: [job_number] });

	const [tab, setTab] = useState({
		shipmentDetailsTab : true,
		documentsTab       : false,
		ticketsTab         : false,
		costSheetTab       : false,
	});

	const [checkItem, setCheckItem] = useState({
		shipmentDetailCheck  : false,
		documentDetailsCheck : false,
		ticketDetailsCheck   : false,
		costSheetCheck       : false,
	});

	const onTabClick = ({ tabName = '' }) => {
		setTab(
			(prev) => ({ ...prev, [tabName]: !prev[tabName] }),
		);
	};

	const onAccept = ({ tabName = '', tabToOpen = '', timelineItem = '' }) => {
		setTab(
			(prev) => ({ ...prev, [tabToOpen]: true, [tabName]: !prev[tabName] }),
		);
		setCheckItem(
			(prev) => ({ ...prev, [timelineItem]: true }),
		);
	};

	return (
		<div>
			<TicketsCard
				serialId={job_number}
				onTabClick={onTabClick}
				loadingShipment={loadingShipment}
				tab={tab}
			/>

			<DetailsCard
				onTabClick={onTabClick}
				dataList={dataList}
				onAccept={onAccept}
				shipmentDetailsTab={tab.shipmentDetailsTab}
				shipmentDetailsCheck={checkItem.shipmentDetailCheck}
				loadingShipment={loadingShipment}
			/>

			<DocumentsCard
				shipmentId={shipmentId}
				onTabClick={onTabClick}
				loadingShipment={loadingShipment}
				tab={tab}
			/>
			<CostSheetCard
				quotationsData={quotationsData}
				onTabClick={onTabClick}
				tab={tab}
			/>

			<div className={styles.all_task_container}>
				<PrePostCheckoutCardsSet
					shipment_id={shipmentId}
					jobId={job_id}
					setQuotationsData={setQuotationsData}
					ref={getPrePostShipmentQuoteRef}
				/>

				{!invoicesLoading && (
					<OperationClosedCardsSet
						shipment_id={shipmentId}
						job_id={job_id}
						billsMap={billsMap}
						invoicesMap={invoicesMap}
						setQuotationsData={setQuotationsData}
					/>
				)}

				{active_tab === 'financial_close' && !billsLoading && (
					<FinanceClosedCardsSet
						shipment_id={shipmentId}
						invoicesMap={invoicesMap}
						billsMap={billsMap}
						job_id={job_id}
						setQuotationsData={setQuotationsData}
					/>
				)}
			</div>

		</div>
	);
}

export default QuotationCards;
