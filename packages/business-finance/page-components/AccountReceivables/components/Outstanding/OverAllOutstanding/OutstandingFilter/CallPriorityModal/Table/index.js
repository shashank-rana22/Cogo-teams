import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../../../commons/styledTable/index';

import styles from './styles.module.css';

function Table({ loading = false, data = {}, filters = {}, setFilters = () => { }, config = [] }) {
	const { list = [], page, total_count:totalCount } = data || {};

	return (
		<div className={styles.table}>
			<StyledTable data={list} columns={config} loading={loading} />

			{totalCount >= filters.pageLimit
				? (
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={totalCount}
							pageSize={filters.pageLimit}
							onPageChange={(val) => setFilters({ ...filters, page: val })}
						/>
					</div>
				)
				: null }

		</div>
	);
}

export default Table;
