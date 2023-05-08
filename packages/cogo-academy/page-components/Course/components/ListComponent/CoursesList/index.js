import { Table, Pagination } from '@cogoport/components';

import { courseListColumns } from './courseTableColumns';
import styles from './styles.module.css';

function CoursesList() {
	const columns = courseListColumns;
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
export default CoursesList;
