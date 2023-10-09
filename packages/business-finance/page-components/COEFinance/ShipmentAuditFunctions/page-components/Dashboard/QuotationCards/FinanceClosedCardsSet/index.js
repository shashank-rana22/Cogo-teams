import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetClosedTasks from '../../../../../hook/useGetClosedTasks';

import FinancialClosedCards from './FinancialClosedCards';
import styles from './styles.module.css';

function FinanceClosedCardsSet({
	job_id = '',
	setQuotationsData = () => {},
}) {
	const {
		data: taskData = {},
		loading: taskDataLoading = true,
		getClosedTasks = () => {},
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

			setQuotationsData((prev) => ({ ...prev, financialClosedData: taskData }));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(taskData), setQuotationsData]);

	return (
		<div className={styles.task_specific_container}>
			<FinancialClosedCards
				jobId={job_id}
				data={taskData?.SELL}
				type="SELL"
				financeCardOpen={financeCardOpen}
				setFinanceCardOpen={setFinanceCardOpen}
				loading={taskDataLoading}
				getClosedTasks={getClosedTasks}
			/>

			<FinancialClosedCards
				jobId={job_id}
				data={taskData?.BUY}
				type="BUY"
				financeCardOpen={financeCardOpen}
				setFinanceCardOpen={setFinanceCardOpen}
				loading={taskDataLoading}
				getClosedTasks={getClosedTasks}
			/>

		</div>
	);
}

export default FinanceClosedCardsSet;
