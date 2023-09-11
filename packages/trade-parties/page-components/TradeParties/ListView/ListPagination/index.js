import { Pagination } from '@cogoport/components';

import styles from './styles.module.css';

function ListPagination({ paginationProps = {} }) {
	const { filterParams = {}, setFilterParams = () => {}, data = {} } = paginationProps;
	const setPage = (value) => {
		setFilterParams((prev) => ({ ...prev, page: value }));
	};
	return (
		<Pagination
			type="table"
			currentPage={filterParams.page}
			onPageChange={setPage}
			totalItems={data?.total_count}
			pageSize={data?.page_limit}
			className={styles.page}
		/>
	);
}
export default ListPagination;
