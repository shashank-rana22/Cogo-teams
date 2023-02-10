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
		return <EmptyState />;
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
						className="md"
						pageRange={3}
						pageLimit={page_limit || 10}
						total={total_count || 0}
						pagination={pagination}
						setPagination={setPagination}
					/>
				</div>
			)}
		</div>
	);
}

export default UserTableData;
