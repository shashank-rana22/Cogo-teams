import useGetClosedTasks from '../../../../../hook/useGetClosedTasks';

import FinancialClosedCards from './FinancialClosedCards';
import styles from './styles.module.css';

function FinanceClosedCardsSet({
	job_id = '',
}) {
	const {
		data: taskData = {},
		loading: taskDataLoading = true,
		getClosedTasks = () => {},
	} = useGetClosedTasks({ job_id, activeTab: 'financial_close' });

	return (
		<div className={styles.task_specific_container}>
			<FinancialClosedCards
				data={taskData?.SELL}
				type="sell"
				loading={taskDataLoading}
				getClosedTasks={getClosedTasks}
				jobId={job_id}
			/>

			<FinancialClosedCards
				jobId={job_id}
				data={taskData?.BUY}
				type="buy"
				loading={taskDataLoading}
				getClosedTasks={getClosedTasks}
			/>

		</div>
	);
}

export default FinanceClosedCardsSet;
