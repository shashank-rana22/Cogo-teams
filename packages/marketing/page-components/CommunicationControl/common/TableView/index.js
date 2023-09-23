import { Pagination, Table } from '@cogoport/components';

import styles from './styles.module.css';

const TOTAL_PAGE = 0;
const PAGE_LIMIT = 10;

function TableView({ columns = {}, data = {}, pagination = 1, setPagination = () => {} }) {
	const onPageChange = (pageNumber) => {
		setPagination(pageNumber);
	};
	return (
		<>
			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={data?.page || pagination}
					totalItems={data?.total_count || TOTAL_PAGE}
					pageSize={data?.page_limit || PAGE_LIMIT}
					onPageChange={onPageChange}
				/>
			</div>
			<div className={styles.table_container}>
				<Table columns={columns} data={data?.list || []} />
			</div>
			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={data?.page || pagination}
					totalItems={data?.total_count || TOTAL_PAGE}
					pageSize={data?.page_limit || PAGE_LIMIT}
					onPageChange={onPageChange}
				/>
			</div>
		</>
	);
}
export default TableView;
