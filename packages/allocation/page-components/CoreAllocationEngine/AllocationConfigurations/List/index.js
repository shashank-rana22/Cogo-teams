import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';

import ListItem from './ListItem';
import styles from './styles.module.css';

function List(props) {
	const { list, loading, paginationData, getNextPage, listRefetch } = props;

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	if (loading) {
		return 'Loading...';
	}

	if (isEmpty(list)) {
		return (
			<div className={styles.empty_container}>
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
		<div className={styles.list_container}>
			{list.map((item) => (
				<ListItem key={item.id} item={item} listRefetch={listRefetch} />
			))}

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
