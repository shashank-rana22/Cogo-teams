import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import StyledTable from '../../common/StyledTable';

import styles from './styles.module.css';

function EmployeeList({
	selectedIds = [], columns = [], data = [], setSelectedIds = () => {},
	setFilters = () => {}, loading = true,
}) {
	const { list = [], page = 1, total_count } = data || {};

	const handlePagination = (val) => {
		setFilters((prev) => ({
			...prev,
			page: val,
		}));
		setSelectedIds([]);
	};

	return (
		<div>
			<StyledTable
				className={!isEmpty(selectedIds) ? 'height_500' : 'height_100'}
				columns={columns}
				data={list}
				loading={loading}
			/>
			{!isEmpty(list) && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={10}
						onPageChange={handlePagination}
					/>
				</div>
			)}
		</div>
	);
}

export default EmployeeList;
