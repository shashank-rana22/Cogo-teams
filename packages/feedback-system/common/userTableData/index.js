import { Table, Pagination } from '@cogoport/components';

import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function UserTableData({
	columns,
	list = [],
	pagination,
	page_limit,
	setPagination,
	total_count,
	loading = false,
}) {
	if (list?.length === 0 && !loading) {
		return <EmptyState width="40%" height="50%" emptyText="No feedbacks found. Kindly check the filters." />;
	}

	return (
		<div className={styles.table_container}>
			<Table
				columns={columns}
				data={list || []}
				loading={loading}
				loadingRowsCount={10}
			/>

			{total_count > 10 && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={pagination}
						totalItems={1000}
						pageSize={page_limit}
						onPageChange={setPagination}
					/>
				</div>
			)}
		</div>
	);
}

export default UserTableData;
