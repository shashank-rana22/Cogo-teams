import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../../commons/styledTable/index.tsx';
import emailConfig from '../../../../../configs/email_config';

import styles from './styles.module.css';

function Table({ loading = false, data = {}, filters = {}, setFilters = () => {} }) {
	const { list = [], page, totalRecords } = data || {};

	return (
		<div className={styles.table}>
			<StyledTable data={list} columns={emailConfig} loading={loading} />

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={totalRecords}
					pageSize={filters.pageLimit}
					onPageChange={(val) => setFilters({ ...filters, page: val })}
				/>

			</div>

		</div>
	);
}

export default Table;
