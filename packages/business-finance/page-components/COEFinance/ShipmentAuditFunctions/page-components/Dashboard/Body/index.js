import React from 'react';

import FinanceClosedCardsSet from '../QuotationCards/FinanceClosedCardsSet';
import OperationClosedCardsSet from '../QuotationCards/OperationClosedCardsSet';
import PrePostCheckoutCardsSet from '../QuotationCards/PrePostCheckoutCardsSet';

import styles from './styles.module.css';

function Body({
	job_id = '',
	getPrePostShipmentQuoteRef = {},
	setQuotationsData = () => {},
	active_tab = '',
}) {
	return (
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
	);
}

export default Body;
