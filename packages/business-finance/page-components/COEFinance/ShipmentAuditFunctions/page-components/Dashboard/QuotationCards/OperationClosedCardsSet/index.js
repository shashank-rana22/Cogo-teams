import { useEffect } from 'react';

import useGetClosedTasks from '../../../../../hook/useGetClosedTasks';

import OperationalClosedCards from './OperationalClosedCards';
import styles from './styles.module.css';

function OperationClosedCardsSet({
	job_id = '',
	shipment_id = '',
	invoicesMap = {},
	setQuotationsData = () => {},
}) {
	const {
		data: taskData = {},
		loading: taskDataLoading = true,
		getClosedTasks = () => {},
	} = useGetClosedTasks({ job_id, activeTab: 'operational_close' });

	useEffect(() => {
		setQuotationsData((prev) => ({ ...prev, oprClosedData: taskData }));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(taskData)]);

	return (
		<div className={styles.task_specific_container}>
			<OperationalClosedCards
				jobId={job_id}
				data={taskData?.SELL}
				shipment_id={shipment_id}
				type="sell"
				loading={taskDataLoading}
				invoicesMap={invoicesMap}
				getClosedTasks={getClosedTasks}
			/>

			<OperationalClosedCards
				jobId={job_id}
				data={taskData?.BUY}
				type="buy"
				loading={taskDataLoading}
				shipment_id={shipment_id}
				invoicesMap={invoicesMap}
				getClosedTasks={getClosedTasks}
			/>
		</div>
	);
}

export default OperationClosedCardsSet;
