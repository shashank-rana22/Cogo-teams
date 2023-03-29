import { useEffect } from 'react';

import useGetColumns from '../../../../../common/Columns';
import Filters from '../../../../../common/Filters';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';
import useListLogs from '../../../../../hooks/useListLogs';

import styles from './styles.module.css';

function PendingReviews({
	activeTab,
	setItem = () => {},
	setModal = () => {},
	refetchList = false,
	setRefetchList = () => {},
	source = 'hr_dashboard',
}) {
	const {
		employeeData,
		loading,
		params,
		setParams,
		setPage,
		onSubmitModal,
	} = useListLogs('hr_pip_pending_reviews');

	const { list = [], pagination_data = {} } = employeeData;
	const { page_limit, page, total_count } = pagination_data;

	useEffect(() => {
		if (refetchList) {
			onSubmitModal();
			setRefetchList(false);
		}
	}, [onSubmitModal, refetchList, setRefetchList]);

	const columnsToShow = source === 'hr_dashboard' ? feedbackDataColumns.pendingReviewsList
		: feedbackDataColumns.managerProbationList;
	const columns = useGetColumns({
		columnsToShow,
		setItem,
		source,
		activeTab,
		setModal,
	});

	return (
		<div className={styles.container}>
			<div className={styles.filters}>
				<Filters
					params={params}
					setParams={setParams}
					source="hr_pip_dashboard"
				/>

			</div>

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
