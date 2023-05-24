import { Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../commons/EmpyState';
import StyledTable from '../../../../../commons/StyledTable';
import LoadingState from '../../commons/LoadingState';

import styles from './styles.module.css';

function TopicTable({
	columns = [],
	activeTopic,
	data = [],
	topicsLoading = false,
	topicCurrentPage,
	setTopicCurrentPage = () => {},
	setConfigurationPage = () => {},
	reset,
}) {
	const { list:listTopicData = [], total_count } = data || {};
	const router = useRouter();

	if (topicsLoading) return <LoadingState />;

	const renderTable = () => {
		const onClick = () => {
			router.push(
				'/learning/faq/create/configuration?create=topic',
				'/learning/faq/create/configuration?create=topic',
			);
			setConfigurationPage('topic');
			reset();
		};

		if (isEmpty(data?.list)) {
			return (
				activeTopic === 'active' ? (
					<EmptyState
						text="There are no topics right now. Start by adding a topic."
						btn_text="Add Topic"
						onClick={onClick}
					/>
				) : (
					<EmptyState
						text="There are no inactive topics right now."
					/>
				)

			);
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
						pageSize={10}
						onPageChange={setTopicCurrentPage}
					/>
				</div>
			</div>
		);
	};

	return renderTable();
}

export default TopicTable;
