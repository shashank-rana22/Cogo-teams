import { Pagination } from '@cogoport/components';

import styles from './styles.module.css';

function ListPagination({ paginationProps = {} }) {
	const { params = {}, setParams = () => {}, data = {} } = paginationProps;
	const setPage = (val) => {
		setParams({ ...params, page: val });
	};
	return (
		<div className={styles.pagination}>
			<Pagination
				currentPage={params.page}
				onPageChange={setPage}
				totalItems={data?.total_count}
				type="table"
				pageSize={data?.page_limit}
			/>
		</div>
	);
}
export default ListPagination;
