import { Table, Pagination } from '@cogoport/components';
import { useState } from 'react';

import getListColumnMapping from './get-list-column-mapping';
import styles from './styles.module.css';

function List(props) {
	const { list = [], paginationData, getNextPage, loading, refetch } = props;

	const [activeActionId, setActiveActionId] = useState(null);

	const { page, total_count, page_limit } = paginationData || {};

	const LIST_COLUMN_MAPPING = getListColumnMapping({ activeActionId, setActiveActionId, refetch });

	return (
		<>
			<div className={styles.table_container}>
				<Table
					className={styles.scoring_plans_table}
					columns={LIST_COLUMN_MAPPING}
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

		</>
	);
}

export default List;
