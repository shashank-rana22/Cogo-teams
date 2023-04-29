import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../commons/EmptyState';

import styles from './styles.module.css';

function ListTable(props) {
	const { columns, list, loading, paginationData, getNextPage } = props;

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={280}
					width={440}
					emptyText="No Pages Found"
					textSize="24px"
					flexDirection="column"
				/>
			</div>
		);
	}

	return (
		<div>
			<div className={styles.table_container}>
				<Table
					className={styles.table}
					columns={columns}
					data={list}
					loading={loading}
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</div>

	);
}

export default ListTable;
