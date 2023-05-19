import { Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/Empty';
import useGetOrganizationCohort from '../../../hooks/useGetOrganizationCohort';

import ResultColumns from './resultColumns';
import styles from './styles.module.css';

function CohortTable({ isComponentInViewport, byEtd, headerFilters }) {
	const {
		data: apiData,
		loading,
		setPage,
	} = useGetOrganizationCohort({ isComponentInViewport, byEtd, headerFilters });

	const { data = [], page, page_size } = apiData || {};

	const newColumns = ResultColumns({ loading });

	const handlePagination = (p) => {
		setPage(p);
	};

	return (
		<div className={styles.container_table}>
			<div className={styles.heading}>Cohort</div>
			<div className={styles.table}>
				{isEmpty(data) ? (
					<EmptyState />
				) : (
					<>
						<span className={styles.tag}>
							<i>Transacting customers by months after signup</i>
						</span>
						<Table
							className={styles.style_table}
							columns={newColumns}
							data={data || []}
							loading={loading}
							loadingRowsCount={5}
						/>
					</>
				)}

			</div>

			<div className={styles.pagination}>
				<div>
					{page !== 1 && (
						<div
							style={{
								cursor : loading ? 'not-allowed' : 'pointer',
								color  : 'red',
							}}
							onClick={loading ? () => {} : () => handlePagination(1)}
							role="button"
							tabIndex="0"
						>
							Go to page 1
						</div>
					)}
				</div>
				<div>
					{page && (
						<div className={styles.pagination_container}>
							<Pagination
								className={styles.pagination}
								type="page"
								currentPage={page}
								pageSize={page_size}
								onPageChange={(val) => setPage(val)}
								totalItems={1000}
							/>
						</div>
					)}
				</div>

			</div>

		</div>
	);
}

export default CohortTable;
