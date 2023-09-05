import { Table, Pagination } from '@cogoport/components';
import React from 'react';

import useGetColumns from '../../../configurations/ap-ar-settlement/docList-column';

import styles from './styles.module.css';

function DocList({
	data = [],
	loading = false,
	onPageChange = () => {},
	selectedData = [],
	setSelectedData = () => {},
	sortData = {},
	setSortData = () => {},
	pageCheckedRows = [],
	setPageCheckedRows = () => {},
}) {
	const { list = [] } = data || {};
	const table_columns = useGetColumns({
		data,
		loading,
		selectedData,
		setSelectedData,
		sortData,
		setSortData,
		pageCheckedRows,
		setPageCheckedRows,
	});
	return (
		<div>
			<div className={styles.container}>
				<Table columns={table_columns} data={list} className={styles.tablestyle} loading={loading} />
				<Pagination
					className={styles.pagination}
					currentPage={data?.pageNo}
					totalItems={data?.totalRecords}
					pageSize={10}
					onPageChange={onPageChange}
				/>
			</div>

		</div>
	);
}
export default DocList;
