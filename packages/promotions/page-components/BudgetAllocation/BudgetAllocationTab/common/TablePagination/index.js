import { Pagination } from '@cogoport/components';

import styles from './styles.module.css';

function TablePagination({ data = {}, setFilters = () => {} }) {
	const { page_limit = 10, total_count = 1, page = 0 } = data || {};

	const onClick = (currentPage) => {
		setFilters((state) => ({ ...state, page: currentPage }));
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

export default TablePagination;
