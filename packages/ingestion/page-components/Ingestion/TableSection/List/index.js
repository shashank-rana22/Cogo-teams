import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';

import styles from './styles.module.css';

function List({
	columns = [],
	onPageChange = () => {},
	data,
	loading = false,
}) {
	const { list, page, page_limit, total_count } = data || {};

	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.empty}>
				<EmptyState height="300px" width="200px" />
			</div>

		);
	}

	return (
		<>
			<div className={styles.table_container}>
				<Table
					className={styles.table}
					columns={columns}
					data={list || []}
					loading={loading}
				/>

			</div>

			{total_count > page_limit && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page || 1}
						totalItems={total_count || 0}
						pageSize={page_limit || 10}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</>

	);
}

export default List;
