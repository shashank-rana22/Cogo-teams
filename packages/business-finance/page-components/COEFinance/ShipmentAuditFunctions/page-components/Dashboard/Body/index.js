import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useListShipment from '../../../../hook/useListShipment.ts';
import DetailsCard from '../DetailsCard';
import FinanceClosedCardsSet from '../QuotationCards/FinanceClosedCardsSet';
import OperationClosedCardsSet from '../QuotationCards/OperationClosedCardsSet';
import PrePostCheckoutCardsSet from '../QuotationCards/PrePostCheckoutCardsSet';

import styles from './styles.module.css';

function Body({
	getPrePostShipmentQuoteRef = {},
	setQuotationsData = () => {},
}) {
	const { query: { active_tab = '', job_id = '', job_number = '' } } = useRouter();
	const { data: shipmentData, loading: loadingShipment } = useListShipment(job_number);
	const dataList = shipmentData?.list[GLOBAL_CONSTANTS.zeroth_index] || {};

	const [tab, setTab] = useState({
		shipmentDetailsTab : true,
		documentsTab       : false,
	});

	const [checkItem, setCheckItem] = useState({
		shipmentDetailCheck  : false,
		documentDetailsCheck : false,
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
			<DetailsCard
				onTabClick={onTabClick}
				dataList={dataList}
				onAccept={onAccept}
				shipmentDetailsTab={tab.shipmentDetailsTab}
				shipmentDetailsCheck={checkItem.shipmentDetailCheck}
				loadingShipment={loadingShipment}
			/>

			<div className={styles.all_task_container}>
				<PrePostCheckoutCardsSet
					jobId={job_id}
					setQuotationsData={setQuotationsData}
					ref={getPrePostShipmentQuoteRef}
				/>

				<OperationClosedCardsSet
					job_id={job_id}
					setQuotationsData={setQuotationsData}
				/>

				{active_tab === 'financial_close' && (
					<FinanceClosedCardsSet
						job_id={job_id}
						setQuotationsData={setQuotationsData}
					/>
				)}
			</div>

		</div>
	);
}

export default Body;
