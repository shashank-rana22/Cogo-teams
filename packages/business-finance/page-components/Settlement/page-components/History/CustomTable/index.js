import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Loader from '../../Loader/index';
import FooterCard from '../FooterCard';

import Header from './Header';
import ListData from './ListData';
import styles from './styles.module.css';

function CustomTable({
	apiData = {},
	onPageChange,
	loading,
	setFilters,
	filters,
	getTableBodyCheckbox,
	isAllChecked,
	onChangeTableHeaderCheckbox,
	showHeaderCheckbox,
	checkedRows,
	refetch,
	setCheckedRows,
	showFooter = true,
	source = '',
}) {
	const {
		list = [],
		pageNo = 1,
		totalRecords = 0,
	} = apiData || {};

	return (
		<div className={styles.table}>
			<Header
				setFilters={setFilters}
				filters={filters}
				isAllChecked={isAllChecked}
				onChangeTableHeaderCheckbox={onChangeTableHeaderCheckbox}
				showHeaderCheckbox={showHeaderCheckbox}
				loading={loading}

			/>

			{loading ? (
				<Loader />
			) : (
				<ListData
					list={list}
					getTableBodyCheckbox={getTableBodyCheckbox}
					refetch={refetch}
					source={source}
				/>
			)}
			{!isEmpty(list) ? (
				<>
					<Pagination
						className={styles.pagination}
						type="number"
						currentPage={pageNo}
						totalItems={totalRecords}
						pageSize={10}
						onPageChange={onPageChange}
					/>
					{showFooter ? (
						<FooterCard
							checkedRows={checkedRows}
							refetch={refetch}
							setCheckedRows={setCheckedRows}
						/>
					) : null}
				</>
			) : null}
		</div>
	);
}

export default CustomTable;
