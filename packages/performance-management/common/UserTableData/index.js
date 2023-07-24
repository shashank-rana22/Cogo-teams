import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

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
	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState width="40%" height="50%" emptyText="No feedbacks found. Kindly check the filters." />
			</div>
		);
	}

	return (
		<div className={styles.table_container}>
			<Table
				columns={columns}
				data={list}
				loading={loading}
				loadingRowsCount={10}
				className={styles.table}
			/>

			{total_count > page_limit && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={pagination}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setPagination}
					/>
				</div>
			)}
		</div>
	);
}

export default UserTableData;
