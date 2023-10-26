import { useEffect } from 'react';

import useGetClosedTasks from '../../../../../hook/useGetClosedTasks';

import FinancialClosedCards from './FinancialClosedCards';
import styles from './styles.module.css';

function FinanceClosedCardsSet({
	job_id = '',
	shipment_id = '',
	setQuotationsData = () => {},
}) {
	const {
		data: taskData = {},
		loading: taskDataLoading = true,
		getClosedTasks = () => {},
	} = useGetClosedTasks({ job_id, activeTab: 'financial_close' });

	useEffect(() => {
		setQuotationsData((prev) => ({ ...prev, financialClosedData: taskData }));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(taskData)]);

	return (
		<div className={styles.task_specific_container}>
			<FinancialClosedCards
				data={taskData?.SELL}
				type="sell"
				loading={taskDataLoading}
				getClosedTasks={getClosedTasks}
				shipment_id={shipment_id}
				jobId={job_id}
			/>

			<FinancialClosedCards
				jobId={job_id}
				data={taskData?.BUY}
				type="buy"
				loading={taskDataLoading}
				shipment_id={shipment_id}
				getClosedTasks={getClosedTasks}
			/>

		</div>
	);
}

export default FinanceClosedCardsSet;
