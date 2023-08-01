import { Pagination, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import StyledTable from '../../common/StyledTable';
import { PAGE_LIMIT_OPTIONS } from '../utils/constants';

import styles from './styles.module.css';

function EmployeeList({
	selectedIds = [], columns = [], data = [], setSelectedIds = () => {},
	setFilters = () => {}, loading = true,
}) {
	const { list = [], page = 1, total_count, page_limit } = data || {};

	const handlePagination = (val) => {
		setFilters((prev) => ({
			...prev,
			page: val,
		}));
		setSelectedIds([]);
	};

	return (
		<div className={styles.main_container}>
			<StyledTable
				className={!isEmpty(selectedIds) ? 'height_500' : 'height_100'}
				columns={columns}
				data={list}
				loading={loading}
			/>
			{!isEmpty(list) && (
				<div className={styles.pagination_container}>
					<div className={styles.page_limit_container}>
						<div className={styles.label}>
							Page Limit :
						</div>
						<Select
							value={page_limit}
							onChange={(e) => setFilters((prev) => ({ ...prev, page_limit: e, page: 1 }))}
							placeholder="Page Limit"
							size="sm"
							options={PAGE_LIMIT_OPTIONS}
						/>
					</div>

					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={handlePagination}
					/>
				</div>
			)}
		</div>
	);
}

export default EmployeeList;
