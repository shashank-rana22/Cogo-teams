import { Pagination, Table } from '@cogoport/components';
import React from 'react';

import EmptyState from './EmptyState';
import styles from './styles.module.css';

function InvoicesTable({
	id,
	className,
	columns,
	data,
	pageSize,
	page,
	total,
	setFilters = () => {},
	filters = {},
	loading,
	showPagination = true,
	...rest
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

			{data?.length === 0 ? <EmptyState text={rest?.emptytext} /> : null}

			{showPagination ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total}
						pageSize={pageSize}
						onPageChange={(val) => setFilters({ ...filters, page: val })}
					/>
				</div>
			) : null}
		</div>
	);
}
export default InvoicesTable;
