import { Table, Pagination } from '@cogoport/components';
import React from 'react';

import useGetColumns from '../../../configurations/ap-ar-settlement/docList-column';

import styles from './styles.module.css';

const PAGE_SIZE = 10;
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
	const TABLE_COLUMNS = useGetColumns({
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
		<div className={styles.container}>
			<Table columns={TABLE_COLUMNS} data={list} className={styles.tablestyle} loading={loading} />
			<Pagination
				className={styles.pagination}
				currentPage={data?.pageNo}
				totalItems={data?.totalRecords}
				pageSize={PAGE_SIZE}
				onPageChange={onPageChange}
			/>
		</div>

	);
}
export default DocList;
