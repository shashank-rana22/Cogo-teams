import { useEffect } from 'react';

import feedbackDataColumns from '../../../constants/feedback-data-columns';
import useListLogs from '../../../hooks/useListLogs';
import useGetColumns from '../../Columns';
import Filters from '../../Filters';
import UserTableData from '../../UserTableData';

import styles from './styles.module.css';

function PendingReviews({
	activeTab,
	logType,
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
	} = useListLogs({ source: 'hr_pip_pending_reviews', logType });

	const { list = [], pagination_data = {} } = employeeData;
	const { page_limit, page, total_count } = pagination_data;

	const columnsToShow = source === 'hr_dashboard' ? feedbackDataColumns.pendingReviewsList[logType]
		: feedbackDataColumns.managerProbationList;

	const columns = useGetColumns({
		columnsToShow,
		setItem,
		source,
		activeTab,
		setModal,
	});

	useEffect(() => {
		if (refetchList) {
			onSubmitModal();
			setRefetchList(false);
		}
	}, [onSubmitModal, refetchList, setRefetchList]);

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
