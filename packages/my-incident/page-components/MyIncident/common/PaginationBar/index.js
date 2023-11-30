import { Pagination } from '@cogoport/components';

import styles from './styles.module.css';

const PAGE_LIMIT = 10;

function PaginationBar({ data = {}, onPageChange = () => {} }) {
	const { pageIndex = 1, total = '', pageSize = 10 } = data || {};

	if (total > PAGE_LIMIT) {
		return (
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={pageIndex}
					totalItems={total}
					pageSize={pageSize}
					onPageChange={onPageChange}
				/>
			</div>
		);
	}
	return null;
}

export default PaginationBar;
