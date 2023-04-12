import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import feedbackDataColumns from '../../../constants/feedback-data-columns';
import useListLogs from '../../../hooks/useListLogs';
import useGetColumns from '../../Columns';
import Filters from '../../Filters';
import Statistics from '../../Statistics';
import UserTableData from '../../UserTableData';

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

	const columnsToShow = feedbackDataColumns.pipProbationList;
	const columns = useGetColumns({
		columnsToShow,
		activeTab,
		setItem,
		source: 'hr_dashboard',
		setModal,
		setOpenLogModal,
	});

	useEffect(() => {
		if (refetchList) {
			onSubmitModal();
			setRefetchList(false);
		}
	}, [onSubmitModal, refetchList, setRefetchList]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Statistics
					logType={logType}
				/>
			</div>

			<div className={styles.heading}>{`Past ${startCase(logType || '---')} List`}</div>

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
