import { Pagination } from '@cogoport/components';

import StyledTable from '../../../../../commons/StyledTable';

import styles from './styles.module.css';

function TagTable({ columns = [], data = [], tagCurrentPage, setTagCurrentPage = () => {} }) {
	const { list:listTagsData = [], total_count } = data || {};
	return (
		<div>
			<div>
				<div className={styles.table}>
					<StyledTable columns={columns} data={listTagsData} />
				</div>

			</div>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={tagCurrentPage}
					totalItems={total_count}
					pageSize={5}
					onPageChange={setTagCurrentPage}
				/>
			</div>
		</div>

	);
}

export default TagTable;
