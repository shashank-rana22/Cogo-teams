import { Pagination, Table } from '@cogoport/components';

import { studentListColumns } from './studentTableColumns';
import styles from './styles.module.css';

function StudentsList() {
	const columns = studentListColumns;
	return (
		<div className={styles.table_container}>

			<Table
				className={styles.table_container}
				// data={list || []}
				columns={columns}
				// loading={loading}
			/>

			{true ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage=""
						totalItems=""
						pageSize=""
						onPageChange={() => {}}
					/>
				</div>
			) : null}
		</div>
	);
}
export default StudentsList;
