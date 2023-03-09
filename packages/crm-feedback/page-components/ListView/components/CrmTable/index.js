import { Pagination, Table } from '@cogoport/components';

import useFeedbackTableData from '../../hooks/useFeedbackTableData';

import styles from './styles.module.css';

function CrmTable() {
	const { columns, data } = useFeedbackTableData();
	// const data = [{}];

	// EMPTY STATE TO BE MADE
	return (
		<>

			<div className={styles.table_container}>
				<Table
					className={styles.table}
					columns={columns}
					data={data || []}
				/>
			</div>
			{/* <div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={pageLimit}
					onPageChange={(val) => onChangeParams({ page: val })}
				/>
			</div> */}

		</>
	);
}

export default CrmTable;
