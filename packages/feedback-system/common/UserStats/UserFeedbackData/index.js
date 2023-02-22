import useListUserFeedbacks from '../../../hooks/useListUserFeedbacks';
import useGetColumns from '../../Columns';
import UserTableData from '../../userTableData';

import styles from './styles.module.css';

function UserFeedbackData({ userId = '' }) {
	const { params, feedbackData, loading, setPage } = useListUserFeedbacks({
		userId,
	});

	const { list: FeedbackList, page_limit, total_count } = feedbackData || {};

	const columnsToShow = ['name', 'designation', 'rating', 'feedback', 'month'];

	const columns = useGetColumns({ columnsToShow });

	return (
		<>
			<div className={styles.header}>
				<p className={styles.list_header}>Feedback List</p>
			</div>

			<UserTableData
				columns={columns}
				list={FeedbackList}
				page_limit={page_limit}
				total_count={total_count}
				loading={loading}
				pagination={params.page}
				setPagination={setPage}
			/>
		</>
	);
}

export default UserFeedbackData;
