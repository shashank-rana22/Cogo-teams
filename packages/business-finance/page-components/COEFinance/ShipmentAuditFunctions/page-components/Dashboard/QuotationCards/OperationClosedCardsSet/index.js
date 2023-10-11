import useGetClosedTasks from '../../../../../hook/useGetClosedTasks';

import OperationalClosedCards from './OperationalClosedCards';
import styles from './styles.module.css';

function OperationClosedCardsSet({
	job_id = '',
}) {
	const {
		data: taskData = {},
		loading: taskDataLoading = true,
		getClosedTasks = () => {},
	} = useGetClosedTasks({ job_id, activeTab: 'operational_close' });

	return (
		<div className={styles.task_specific_container}>
			<OperationalClosedCards
				jobId={job_id}
				data={taskData?.SELL}
				type="sell"
				loading={taskDataLoading}
				getClosedTasks={getClosedTasks}
			/>

			<OperationalClosedCards
				jobId={job_id}
				data={taskData?.BUY}
				type="buy"
				loading={taskDataLoading}
				getClosedTasks={getClosedTasks}
			/>
		</div>
	);
}

export default OperationClosedCardsSet;
