import { Pagination, Table } from '@cogoport/components';
import React from 'react';

import EmptyState from '../EmptyState';

import styles from './style.module.css';

function StyledTable({
	id, className, columns, selectType, showAllNestedOptions, showEmptyState,
	data, renderRowSubComponent, pageSize, page, total, setFilters, filters, loading, ...rest
}) {
	return (
		<div className={styles.table}>

			<Table
				columns={columns}
				renderRowSubComponent={renderRowSubComponent}
				data={data}
				id={id}
				className={className}
				loading={loading}
				selectType={selectType}
				showAllNestedOptions={showAllNestedOptions}
				{...rest}
			/>

			{data?.length === 0 && !loading && <EmptyState showEmptyState={showEmptyState} />}
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total}
					pageSize={pageSize}
					onPageChange={(val) => setFilters({ ...filters, page: val })}
				/>
			</div>
		</div>
	);
}
export default StyledTable;
