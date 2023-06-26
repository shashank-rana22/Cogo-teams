import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../common/StyledTable';
import useGetEmployees from '../../hooks/useGetEmployees';

import styles from './styles.module.css';
import getColumns from './useGetColumns';

function EmployeeList() {
	const { data, loading, setFilters } = useGetEmployees();
	const columns = getColumns();
	const { list, page, page_limit, total_count } = data || {};
	return (
		<>
			<div className={styles.title}>
				Employee List
			</div>
			<StyledTable columns={columns} data={list} loading={loading} />
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}
				/>
			</div>
		</>
	);
}

export default EmployeeList;
