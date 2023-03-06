import {
	DateRangepicker, Table, Pagination,
} from '@cogoport/components';

import useListAllocationInstances from '../../../../../hooks/useListAllocationInstances';

import styles from './styles.module.css';

function ListInstances({ item }) {
	const {
		list,
		listLoading,
		paginationData,
		getNextPage,
		dateRange,
		setDateRange,
		columns,
	} =	 useListAllocationInstances({ item });

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	return (
		<section className={styles.container}>
			<div className={styles.daterange_container}>
				<DateRangepicker
					value={dateRange}
					onChange={setDateRange}
					isPreviousDaysAllowed
					maxDate={new Date()}
				/>
			</div>

			<Table
				className={styles.table}
				columns={columns}
				data={list}
				loading={listLoading}
			/>

			<div className={styles.pagination_container}>
				<Pagination
					type="compact"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</section>
	);
}

export default ListInstances;
