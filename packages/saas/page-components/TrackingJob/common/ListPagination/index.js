import { Pagination } from '@cogoport/components';

import styles from './styles.module.css';

function ListPagination({ filters = {}, setFilters = () => {}, data = {} }) {
	const { page, ...restFilters } = filters || {};

	const { page_limit = 10, total_count = 1 } = data || {};

	const onClick = (currentPage) => {
		setFilters({ ...restFilters, page: currentPage });
	};
	return (
		<div className={styles.pagination}>
			<Pagination
				type="table"
				pageSize={page_limit}
				totalItems={total_count}
				currentPage={page}
				onPageChange={onClick}
			/>
		</div>
	);
}

export default ListPagination;
