import React, { useState } from 'react';

import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import useGetRatingCycle from '../../hooks/useGetRatingCycle';

import EmployeeDetails from './EmployeeDetails';
import EmployeePerformance from './EmployeePerformance';
import styles from './styles.module.css';

function EmployeeDashboard() {
	const [ratingCycle, setRatingCycle] = useState('21-June-2023_20-July-2023');
	const { data, loading } = useGetEmployeeDetails(ratingCycle);
	const { ratingOptions } = useGetRatingCycle(setRatingCycle);

	const { employee_basic_details } = data || {};

	return (
		<>
			<div className={styles.heading}>
				Employee Dashboard
			</div>
			<div className={styles.flex_container}>
				<div className={styles.flex_item1}>
					<EmployeeDetails data={employee_basic_details} loading={loading} />
				</div>
				<div className={styles.flex_item2}>
					<EmployeePerformance
						data={data}
						ratingCycle={ratingCycle}
						setRatingCycle={setRatingCycle}
						ratingOptions={ratingOptions}
						loading={loading}
					/>
				</div>
			</div>
		</>
	);
}

export default EmployeeDashboard;
