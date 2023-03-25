import useGetColumns from '../../../../../common/Columns';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';
import useListEmployees from '../../../../../hooks/useListEmployees';

import styles from './styles.module.css';

function PendingReviews({
	activeTab,
	setItem = () => {},
	setModal = () => {},
	// setType = () => {},
}) {
	// const dataList = {
	// 	1: [{
	// 		name         : 'apple',
	// 		id           : '1',
	// 		designation  : 'fruit',
	// 		manager_name : 'apple_tree',
	// 		rating       : 3,
	// 		update       : 'probation created',
	// 	},
	// 	{
	// 		name            : 'mango',
	// 		id              : '2',
	// 		designation     : 'fruit',
	// 		manager_name    : 'mango_tree',
	// 		employee_status : 'employed',
	// 		rating          : 3,
	// 		update          : 'cleared',
	// 	}],
	// 	2: [{
	// 		name            : 'lemon',
	// 		id              : '3',
	// 		designation     : 'fruit',
	// 		manager_name    : 'lemon_tree',
	// 		employee_status : 'probation',
	// 		rating          : 3,
	// 		update          : 'pip extended',
	// 	},
	// 	{
	// 		name            : 'carrot',
	// 		id              : '5',
	// 		designation     : 'vegetable',
	// 		manager_name    : 'carrot_plant',
	// 		employee_status : 'probation',
	// 		rating          : 3,
	// 		update          : 'exited',
	// 	}],
	// };

	const {
		employeeData,
		loading,
		// params,
		// setParams,
		setPage,
	} = useListEmployees(false);
	const { list = [], pagination_data = {} } = employeeData;
	const { page_limit, page, total_count } = pagination_data;

	const columnsToShow = feedbackDataColumns.pendingReviewsList;
	const columns = useGetColumns({
		columnsToShow,
		setItem,
		source: 'hr_dashboard',
		activeTab,
		setModal,
	});

	return (
		<div className={styles.container}>
			<UserTableData
				loading={loading}
				columns={columns}
				list={list}
				pagination={page}
				page_limit={page_limit}
				setPagination={setPage}
				total_count={total_count}
			/>
		</div>
	);
}

export default PendingReviews;
