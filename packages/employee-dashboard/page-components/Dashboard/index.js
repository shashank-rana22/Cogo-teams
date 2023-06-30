import React from 'react';

import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';

import EmployeeDetails from './EmployeeDetails';
import EmployeePerformance from './EmployeePerformance';
import styles from './styles.module.css';

function EmployeeDashboard() {
	const { data, loading } = useGetEmployeeDetails();

	console.log('data', data);

	const { employee_basic_details } = data || {};

	if (loading) {
		return 'loading...';
	}

	return (
		<div className={styles.flex_container}>
			<div className={styles.flex_item1}>
				<EmployeeDetails data={employee_basic_details} />
			</div>
			<div className={styles.flex_item2}>
				<EmployeePerformance data={data} />
			</div>
		</div>

	);
}

export default EmployeeDashboard;
