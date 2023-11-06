import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Loader from '../../page-components/Loader';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

const PAGE_SIZE = 10;

function CustumTable({
	data = {}, onPageChange, loading, refetch, setFilters, filters, selectedJV, setSelectedJV,
}) {
	const { list = [], pageNo = 1, totalRecords = 0 } = (data || {});

	return (
		<div className={styles.table}>
			<Header
				setFilters={setFilters}
				filters={filters}
				selectedJV={selectedJV}
				setSelectedJV={setSelectedJV}
				list={list}
			/>

			{loading ? <Loader /> : (
				<List
					list={list}
					refetch={refetch}
					selectedJV={selectedJV}
					setSelectedJV={setSelectedJV}
				/>
			)}

			{ isEmpty(list) ? null : (
				<Pagination
					className={styles.pagination}
					type="number"
					currentPage={pageNo}
					totalItems={totalRecords}
					pageSize={PAGE_SIZE}
					onPageChange={onPageChange}
				/>
			) }

		</div>
	);
}

export default CustumTable;
