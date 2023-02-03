import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import ListItem from './ListItem';
import styles from './styles.module.css';

function List(props) {
	const { data, loading } = props;
	const { list, page = 0, page_limit: pageLimit = 0, total_count = 0 } = data || {};

	if (isEmpty(list)) {
		return 'Empty';
	}

	return (
		<div>
			{list.map((item) => <ListItem id="request_list" key={item.id} data={item} />)}

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={pageLimit}
					// onPageChange={(val) => onChangeParams({ page: val })}
				/>
			</div>
		</div>

	);
}

export default List;
