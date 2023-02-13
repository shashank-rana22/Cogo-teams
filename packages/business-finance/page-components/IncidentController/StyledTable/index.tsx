import { Pagination, Table } from '@cogoport/components';
import React from 'react';

import { TableProps } from '../interface';

import styles from './style.module.css';

function StyledTable({
	id, className, columns, data, pageSize, pageIndex, total, setFilters, filters, loading, ...rest
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
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={pageIndex}
					totalItems={total}
					pageSize={pageSize}
					onPageChange={(val:any) => setFilters({ ...filters, page: val })}
				/>
			</div>
		</div>
	);
}
export default StyledTable;
