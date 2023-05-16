import { Pagination } from '@cogoport/components';
import React from 'react';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function CustumTable({ data = {}, onPageChange }) {
	const { list = [], pageNo = 1, totalRecords = 0 } = data;
	return (
		<div className={styles.table}>
			<Header />
			<List list={list} />
			<Pagination
				className={styles.pagination}
				type="number"
				currentPage={pageNo}
				totalItems={totalRecords}
				pageSize={10}
				onPageChange={onPageChange}
			/>
		</div>
	);
}

export default CustumTable;
