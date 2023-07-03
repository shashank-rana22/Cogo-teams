import { Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../common/EmptyState';

import useGetTableColumns from './get-table-columns';
import styles from './styles.module.css';

function TableComponent(props) {
	const {
		activeTab = 'spot_searches',
		fields = [],
		loading = false,
		data = {},
		activeStat,
		restFilters,
		setFilters = () => {},
		heading,
	} = props;

	const { list = [], page, total_count } = data || {};

	const columns = useGetTableColumns({ activeTab, fields });

	if (!loading && isEmpty(list)) {
		return (
			<EmptyState heading={heading} />
		);
	}

	return (
		<div className={styles.container}>
			<Table
				columns={columns}
				data={list}
				loading={loading}
				loadingRowsCount={10}
			/>

			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={10}
					onPageChange={(val) => setFilters({ ...(restFilters || {}), activeStat, page: val })}
				/>
			</div>
		</div>
	);
}

export default TableComponent;
