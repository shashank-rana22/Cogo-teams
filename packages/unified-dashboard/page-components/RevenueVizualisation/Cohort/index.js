import { Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/Empty';
import useGetOrganizationCohort from '../../../hooks/useGetOrganizationCohort';

import resultColumns from './resultColumns';
import styles from './styles.module.css';

function CohortTable({ isComponentInViewport, byEtd, headerFilters }) {
	const {
		data: apiData,
		loading,
		setPage,
	} = useGetOrganizationCohort({ isComponentInViewport, byEtd, headerFilters });

	const { data = [], page, page_size } = apiData || {};

	const newColumns = resultColumns({ loading });

	return (
		<div className={styles.container_table}>
			<div className={styles.heading}>Cohort</div>

			{!isEmpty(data) && (
				<span className={styles.tag}>
					<i>Transacting customers by months after signup</i>
				</span>
			)}

			{isEmpty(data) ? (
				<EmptyState />
			) : (
				<Table
					className={styles.style_table}
					columns={newColumns}
					data={data || []}
					loading={loading}
					loadingRowsCount={5}

				/>
			)}

			{page && (
				<Pagination
					className={styles.pagination}
					type="page"
					currentPage={page}
					pageSize={page_size}
					onPageChange={(val) => setPage(val)}
					totalItems={1000}
				/>
			)}
		</div>
	);
}

export default CohortTable;
