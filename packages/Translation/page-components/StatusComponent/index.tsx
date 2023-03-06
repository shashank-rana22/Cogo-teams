import { Pagination } from '@cogoport/components';
import React from 'react';

import EmptyState from '../../common/EmptyState';
import Filters from '../../common/Filters';
import { Translates } from '../../common/interfaces';
import useGetList from '../../hooks/useGetList';
import getColumns from '../../utils/getColumns';
import StyledTable from '../Table';

import styles from './styles.module.css';

function StatusComponent({ status, myTranslates }: Translates) {
	const {
		loading, data = [], setFilters,
		filters, refetch,
	} = useGetList({ status, myTranslates });

	const { list = [], pageIndex = 0, totalRecords = 0, pageLimit = 10 } = data || {};

	const columns = getColumns(status, refetch);

	return (
		<>
			<Filters
				onChangeFilters={setFilters}
				filters={filters}
				status={status}
				refetch={refetch}
			/>
			<StyledTable data={list} columns={columns} loading={loading} />
			{list.length === 0 && !loading && (
				<EmptyState emptyText="No Translation
			Record Found Please Create a Request For Translation"
				/>
			)}
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={pageIndex}
					totalItems={totalRecords}
					pageSize={pageLimit}
					onPageChange={(val) => setFilters({ ...filters, pageIndex: val })}
				/>
			</div>
		</>
	);
}

export default StatusComponent;
