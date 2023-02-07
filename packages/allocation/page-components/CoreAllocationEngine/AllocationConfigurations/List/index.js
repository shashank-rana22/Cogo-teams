import { Pagination } from '@cogoport/components';

import ListItem from './ListItem';
import styles from './styles.module.css';

function List({ list, paginationData, getNextPage, listRefetch }) {
	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

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
