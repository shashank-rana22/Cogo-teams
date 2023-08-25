import { Table, Pagination } from '@cogoport/components';
import React from 'react';

import useGetColumns from '../../../configurations/ap-ar-settlement/docList-column';

import styles from './styles.module.css';

function DocList({
	data,
	loading,
	onPageChange,
	selectedData,
	setSelectedData,
	sortBy,
	setSortBy,
	sortType, setSortType, arrowDirections, setArrowDirections, sortData, setSortData,
}) {
	const { list = [] } = data || {};
	const col = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	const colo = useGetColumns({
		columnsToShow: col,
		data,
		loading,
		selectedData,
		setSelectedData,
		sortBy,
		setSortBy,
		sortType,
		setSortType,
		arrowDirections,
		setArrowDirections,
		sortData,
		setSortData,
	});
	return (
		<div>
			<div className={styles.container}>
				<Table columns={colo} data={list} className={styles.tablestyle} loading={loading} />
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
