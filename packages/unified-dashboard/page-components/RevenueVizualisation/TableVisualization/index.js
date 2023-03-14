import { Pagination, Table } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/Empty';
import Loader from '../../../common/PopoverLoader';

import resultColumns from './resultColumns';
import styles from './styles.module.css';

function TableVisualization({
	selectedPieData,
	apiData,
	loading,
	error,
	setPage,
}) {
	const {
		data = [],
		page,
		page_size,
		total_count,
		columns = [],
	} = apiData || {};

	const newColumns = resultColumns({ columns });

	if (!loading && (error !== null || isEmpty(data))) {
		return <EmptyState />;
	}

	return (
		<div>
			<div className={styles.heading}>
				Table View
				{' '}
				<span className={styles.sub_heading}>
					(
					{`${startCase(selectedPieData.type)} > ${startCase(
						selectedPieData.barId,
					)} > ${startCase(selectedPieData.apiKey)} > ${startCase(
						selectedPieData.label,
					)} `}
					)
				</span>
			</div>
			<div className={styles.table_container}>
				{loading ? (
					<Loader />
				) : (
					<Table
						className={styles.style_table}
						columns={newColumns}
						data={data || []}
						loading={loading}
						loadingRowsCount={10}
					/>
				)}
			</div>

			{data.length > 0 && total_count > page_size && (
				<div className={styles.pagination_container}>
					<Pagination
						type="page"
						pageSize={page_size}
						totalItems={1000}
						currentPage={page}
						onPageChange={(val) => setPage(val)}
					/>
				</div>
			)}
		</div>
	);
}

export default TableVisualization;
