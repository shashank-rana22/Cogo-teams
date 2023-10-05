import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useGetClosedTasks from '../../../../../hook/useGetClosedTasks';

import OperationalClosedCards from './OperationalClosedCards';
import styles from './styles.module.css';

function OperationClosedCardsSet({
	job_id = '',
}) {
	const {
		data: taskData = {},
		// loading: taskDataLoading = true,
	} = useGetClosedTasks({ job_id, activeTab: 'operational_close' });

	const [operationCardOpen, setOperationCardOpen] = useState({});

	useEffect(() => {
		if (!isEmpty(Object.keys(taskData))) {
			const INITIAL_STATE = {};
			Object.keys(taskData).forEach((category) => {
				taskData?.[category]?.forEach((subCategory) => {
					INITIAL_STATE[`${category}_${subCategory?.id}`] = false;
				});
			});
			setOperationCardOpen(INITIAL_STATE);
		}
	}, [taskData]);
	return (
		<div className={styles.task_specific_container}>
			<OperationalClosedCards
				jobId={job_id}
				data={taskData?.SELL}
				type="sell"
				operationCardOpen={operationCardOpen}
				setOperationCardOpen={setOperationCardOpen}
			/>

			<OperationalClosedCards
				jobId={job_id}
				data={taskData?.BUY}
				type="buy"
				operationCardOpen={operationCardOpen}
				setOperationCardOpen={setOperationCardOpen}
			/>
		</div>
	);
}

export default OperationClosedCardsSet;
