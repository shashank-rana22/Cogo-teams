import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import StyledTable from '../../../../../commons/StyledTable';
import EmptyState from '../../commons/EmptyState';
import LoadingState from '../../commons/LoadingState';

import styles from './styles.module.css';

function TopicTable({
	columns = [],
	data = [],
	topicsLoading = false,
	topicCurrentPage,
	setTopicCurrentPage = () => {},
}) {
	const { list:listTopicData = [], total_count } = data || {};

	if (topicsLoading) {
		return <LoadingState />;
	}

	if (isEmpty(listTopicData)) {
		return <EmptyState />;
	}

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
