import { Pagination, Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import EmptyState from '../common/EmptyStateCommon';

import styles from './style.module.css';

function StyledTable({
	id, className, columns, data, pageSize, page, total, setFilters, filters, loading, showPagination = true, ...rest
}) {
	return (
		<div className={styles.table}>
			<Table
				columns={columns}
				data={data}
				id={id}
				className={className}
				loading={loading}
				{...rest}
			/>

			{data.length === [GLOBAL_CONSTANTS.zeroth_index] && <EmptyState />}

			{showPagination && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total}
						pageSize={pageSize}
						onPageChange={(val) => setFilters({ ...filters, page: val })}
					/>
				</div>
			)}
		</div>
	);
}
export default StyledTable;
