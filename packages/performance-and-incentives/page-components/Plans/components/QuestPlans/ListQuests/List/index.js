import { Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../commons/EmptyState';

import getListColumns from './get-list-columns';
import styles from './styles.module.css';

function List(props) {
	const {
		list = [], paginationData, getNextPage, loading, params = {}, setParams, handleUpdate, showEmpty = false,
	} = props;

	const { page, total_count, page_limit } = paginationData || {};

	const LIST_COLUMNS = getListColumns({ params, setParams, handleUpdate });

	if ((!loading && isEmpty(list)) || showEmpty) {
		return (
			<EmptyState
				flexDirection="column"
				height={225}
				width={355}
				textSize={24}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.table_container}>
				<Table
					className={styles.quest_table}
					columns={LIST_COLUMNS}
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
export default List;
