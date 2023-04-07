import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetColumns from '../../../../../common/Columns';
import Filters from '../../../../../common/Filters';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';
import useListLogs from '../../../../../hooks/useListLogs';

import Statistics from './Statistics';
import styles from './styles.module.css';

function Dashboard({
	activeTab,
	logType,
	setItem = () => {},
	setOpenLogModal = () => {},
	setModal = () => {},
	refetchList = false,
	setRefetchList = () => {},
}) {
	const {
		employeeData,
		loading,
		params,
		setParams,
		setPage,
		onSubmitModal,
	} = useListLogs({ source: 'hr_pip_dashboard', logType });

	const { list = [], pagination_data = {} } = employeeData;
	const { page_limit, page, total_count } = pagination_data;

	useEffect(() => {
		if (refetchList) {
			onSubmitModal();
			setRefetchList(false);
		}
	}, [onSubmitModal, refetchList, setRefetchList]);

	const columnsToShow = feedbackDataColumns.pipProbationList;
	const columns = useGetColumns({
		columnsToShow,
		activeTab,
		setItem,
		source: 'hr_dashboard',
		setModal,
		setOpenLogModal,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Statistics
					logType={logType}
				/>
			</div>

			<div className={styles.heading}>{`Past ${startCase(logType)} List`}</div>

			<div className={styles.filters}>
				<Filters
					params={params}
					setParams={setParams}
					source="hr_pip_dashboard"
				/>
			</div>

			<UserTableData
				columns={columns}
				list={list}
				loading={loading}
				pagination={page}
				page_limit={page_limit}
				setPagination={setPage}
				total_count={total_count}
			/>
		</div>
	);
}

export default Dashboard;
