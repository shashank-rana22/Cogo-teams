import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import StyledTable from '../../common/StyledTable';

import styles from './styles.module.css';

function EmployeeList({
	selectedIds = [], columns = [], randomDataArray = [], setSelectedIds = () => {},
	setFilters = () => {},
}) {
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
				data={randomDataArray}
			/>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={1}
					totalItems={1000}
					pageSize={5}
					onPageChange={handlePagination}
				/>
			</div>
		</div>
	);
}

export default EmployeeList;
