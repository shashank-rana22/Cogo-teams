import { Pagination, Table } from '@cogoport/components';
import React from 'react';

import Empty from '../../../common/Empty';

import columns from './Column';
import styles from './styles.module.css';

function ProfitabilityTable({ loading, data, setFilters }) {
	const { list = [], page, total_count } = data || {};

	const column = columns();

	if (list.length === 0 && !loading) {
		return <Empty />;
	}

	return (
		<>
			<div className={styles.container}>
				<Table
					className={styles.table_container}
					columns={column}
					data={list || []}
					loading={loading}
					loadingRowsCount={10}
				/>
			</div>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={10}
					onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}
				/>
			</div>
		</>
	);
}

export default ProfitabilityTable;
