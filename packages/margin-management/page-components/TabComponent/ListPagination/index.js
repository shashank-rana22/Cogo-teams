import { Pagination } from '@cogoport/components';

import styles from './styles.module.css';

function ListPagination({ paginationProps = {} }) {
	const { filterParams = {}, setFilterParams = () => { }, data = {} } = paginationProps;

	const setPage = (val) => {
		setFilterParams({ ...filterParams, page: val });
	};

	return (
		<div className={styles.pagination}>
			<Pagination
				currentPage={filterParams.page}
				onPageChange={setPage}
				totalItems={data?.total_count}
				type="number"
				pageSize={data?.page_limit}
			/>
		</div>
	);
}
export default ListPagination;
