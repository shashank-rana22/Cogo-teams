import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyStateDocs from '../../../commons/EmptyStateDocs/index.tsx';
import Loader from '../Loader';

import Header from './Header';
import ListData from './ListData';
import styles from './styles.module.css';

function CustomTable({
	data = {}, onPageChange = () => {}, loading = false,
	filters = {},
	setFilters = () => {},
}) {
	const { list = [], pageIndex = 1, totalRecords = 0 } = (data || {});

	if (isEmpty(list) && !loading) {
		return <EmptyStateDocs />;
	}

	return (
		<div className={styles.table}>
			<Header
				loading={loading}
			/>

			{loading ? <Loader /> : (
				<ListData
					list={list}
					filters={filters}
					setFilters={setFilters}
				/>
			) }
			<Pagination
				className={styles.pagination}
				type="number"
				currentPage={pageIndex}
				totalItems={totalRecords}
				pageSize={10}
				onPageChange={onPageChange}
			/>
		</div>
	);
}

export default CustomTable;
