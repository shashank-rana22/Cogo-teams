import { Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import styles from '../styles.module.css';

function RenderTable(props) {
	const { columns = [], list = [], loading = false, paginationData = {}, getNextPage = () => {} } = props;

	const { page = 1, total_count = 1, page_limit = 10 } = paginationData;

	if (isEmpty(list)) {
		return (
			<div className={styles.table_container}>
				<EmptyState
					height={280}
					width={440}
					emptyText="No records found"
					textSize="24px"
					flexDirection="column"
				/>
			</div>
		);
	}

	return (
		<div className={styles.table_container}>
			<Table
				className={styles.table}
				columns={columns}
				data={list}
				loading={loading}
			/>

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

export default RenderTable;
