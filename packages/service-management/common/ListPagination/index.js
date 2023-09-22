import { Pagination } from '@cogoport/components';

import styles from './styles.module.css';

function ListPagination({ paginationProps = {} }) {
	const { filters = {}, setFilters = () => {}, data = {} } = paginationProps || {};
	const setPage = (value) => {
		setFilters((prev) => ({ ...prev, page: value }));
	};
	return (
		<Pagination
			type="table"
			currentPage={filters.page}
			onPageChange={setPage}
			totalItems={data?.total_count}
			pageSize={data?.page_limit}
			className={styles.page}
		/>
	);
}
export default ListPagination;
