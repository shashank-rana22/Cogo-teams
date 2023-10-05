import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetClosedTasks from '../../../../../hook/useGetClosedTasks';

import FinancialClosedCards from './FinancialClosedCards';
import styles from './styles.module.css';

function FinanceClosedCardsSet({
	job_id = '',
}) {
	const {
		data: taskData = {},
		// loading: taskDataLoading = true,
	} = useGetClosedTasks({ job_id, activeTab: 'financial_close' });

	const [financeCardOpen, setFinanceCardOpen] = useState({});

	useEffect(() => {
		if (!isEmpty(Object.keys(taskData))) {
			const INITIAL_STATE = {};
			Object.keys(taskData).forEach((category) => {
				taskData?.[category]?.forEach((subCategory) => {
					INITIAL_STATE[`${category}_${subCategory?.id}`] = false;
				});
			});
			setFinanceCardOpen(INITIAL_STATE);
		}
	}, [taskData]);
	return (
		<div className={styles.task_specific_container}>
			{taskData?.SELL && (
				<FinancialClosedCards
					jobId={job_id}
					data={taskData?.SELL}
					type="sell"
					financeCardOpen={financeCardOpen}
					setFinanceCardOpen={setFinanceCardOpen}
				/>
			)}

			{taskData?.SELL && (
				<FinancialClosedCards
					jobId={job_id}
					data={taskData?.BUY}
					type="buy"
					financeCardOpen={financeCardOpen}
					setFinanceCardOpen={setFinanceCardOpen}
				/>
			)}
		</div>
	);
}

export default FinanceClosedCardsSet;
