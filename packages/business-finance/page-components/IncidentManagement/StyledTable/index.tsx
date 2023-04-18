import { Pagination, Table } from '@cogoport/components';
import React from 'react';

import EmptyState from '../common/EmptyState';
import { TableProps } from '../common/interface';

import styles from './style.module.css';

function StyledTable({
	id, className, columns, data, pageSize, page, total, setFilters, filters, loading, showPagination = true, ...rest
}: TableProps) {
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

			{data.length === 0 && <EmptyState />}

			{showPagination && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total}
						pageSize={pageSize}
						onPageChange={(val:number) => setFilters({ ...filters, page: val })}
					/>
				</div>
			)}
		</div>
	);
}
export default StyledTable;
