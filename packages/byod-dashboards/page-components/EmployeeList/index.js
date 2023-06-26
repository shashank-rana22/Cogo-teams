import React from 'react';

import StyledTable from '../../common/StyledTable';
import useGetEmployees from '../../hooks/useGetEmployees';

import styles from './styles.module.css';
import getColumns from './useGetColumns';

function EmployeeList() {
	const { data, loading } = useGetEmployees();
	const columns = getColumns();
	const { list } = data || {};
	return (
		<>
			<div className={styles.title}>
				Employee List
			</div>
			<StyledTable columns={columns} data={list} loading={loading} />
		</>
	);
}

export default EmployeeList;
