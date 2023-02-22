import { Pagination } from '@cogoport/components';

import StyledTable from '../../../../../commons/StyledTable';

import styles from './styles.module.css';

function TopicTable({ columns = [], data = [], topicCurrentPage, setTopicCurrentPage = () => {} }) {
	const { list:listTopicData = [], total_count } = data || {};
	return (
		<div>
			<div className={styles.table}>
				<StyledTable columns={columns} data={listTopicData} />
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={topicCurrentPage}
					totalItems={total_count}
					pageSize={5}
					onPageChange={setTopicCurrentPage}
				/>
			</div>
		</div>

	);
}

export default TopicTable;
