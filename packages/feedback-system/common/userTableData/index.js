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
		return <EmptyState width="40%" height="50%" emptyText="No feedbacks found. Kindly check the filters." />;
	}

	return (
		<div className={styles.table_container}>
			{isEmpty(list) > 0
				? (
					<Table
						columns={columns}
						data={list}
						loading={loading}
						loadingRowsCount={10}
						className={styles.table}
					/>
				)
				: 				(
					<div className={styles.empty_container}>
						<EmptyState
							height={280}
							width={440}
							emptyText="No Data Found"
							textSize="24px"
							flexDirection="column"
						/>
					</div>
				)}

			{total_count > 10 && (
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
