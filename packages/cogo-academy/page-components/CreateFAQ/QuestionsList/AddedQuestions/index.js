import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../commons/StyledTable';

import Header from './Header';
import styles from './styles.module.css';

function AddedQuestions({
	page,
	setPage,
	paginationData,
	data,
	columns,
	setFilters,
	searchInput,
	setSearchInput,
	activeList,
	setActiveList,
	questionListLoading,
}) {
	return (
		<div className={styles.container}>
			<Header
				setFilters={setFilters}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				activeList={activeList}
				setActiveList={setActiveList}
			/>

			<div className={styles.table}>
				<StyledTable columns={columns} data={data} loading={questionListLoading} />
			</div>

			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={paginationData?.total_count}
					pageSize={paginationData?.page_limit}
					onPageChange={setPage}
				/>
			</div>

		</div>
	);
}

export default AddedQuestions;
