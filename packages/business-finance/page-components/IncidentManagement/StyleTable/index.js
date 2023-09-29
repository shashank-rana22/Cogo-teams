import { Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
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

			{isEmpty(data.length) && <EmptyState />}

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
