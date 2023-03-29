import { Table, Pagination } from '@cogoport/components';

import EmptyState from '../../../../../common/EmptyState';
import useGetIngestionList from '../../../hooks/useGetIngestionList';

import styles from './styles.module.css';

function TableSection() {
	const { columns, dummyData, onPageChange, currentPage, loading } = useGetIngestionList();

	const { list, page = 0, page_limit, total_count } = dummyData || {};

	// Todo add a empty condition
	if (false) {
		return (
			<div className={styles.empty}>
				<EmptyState height="300px" width="200px" />
			</div>

		);
	}
	return (
		<div className={styles.table_main_container}>

			<Table
				className={styles.table}
				columns={columns}
				data={list || []}
				loading={loading}
			/>

			{total_count > page_limit && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={currentPage}
						totalItems={total_count || 0}
						pageSize={page_limit || 8}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</div>
	);
}

export default TableSection;
