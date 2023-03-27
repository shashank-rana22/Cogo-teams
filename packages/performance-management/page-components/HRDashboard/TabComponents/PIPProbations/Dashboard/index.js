import { useEffect } from 'react';

import useGetColumns from '../../../../../common/Columns';
import Filters from '../../../../../common/Filters';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';
import useListEmployeesLog from '../../../../../hooks/useListEmployeesLog';

import Statistics from './Statistics';
import styles from './styles.module.css';

function Dashboard({
	activeTab, setItem = () => {}, setOpenLogModal = () => {},
	setModal = () => {},
}) {
	// const dataList = {
	// 	1: [{
	// 		name            : 'apple',
	// 		id              : '1',
	// 		designation     : 'fruit',
	// 		manager_name    : 'apple_tree',
	// 		employee_status : 'exited',
	// 		is_pip          : true,
	// 	},
	// 	{
	// 		name            : 'mango',
	// 		id              : '2',
	// 		designation     : 'fruit',
	// 		manager_name    : 'mango_tree',
	// 		employee_status : 'employed',
	// 		is_pip          : true,
	// 	}],
	// 	2: [{
	// 		name            : 'lemon',
	// 		id              : '3',
	// 		designation     : 'fruit',
	// 		manager_name    : 'lemon_tree',
	// 		employee_status : 'probation',
	// 		is_pip          : false,
	// 	},
	// 	{
	// 		name            : 'carrot',
	// 		id              : '5',
	// 		designation     : 'vegetable',
	// 		manager_name    : 'carrot_plant',
	// 		employee_status : 'probation',
	// 		is_pip          : true,
	// 	}],
	// };

	const {
		employeeData,
		loading,
		params,
		setParams,
		setPage,
	} = useListEmployeesLog();

	useEffect(() => {
		setParams({ ...setParams, IsReviewed: true });
	}, [setParams]);

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

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Statistics />
			</div>

			<div>
				<div className={styles.heading}>PIP &amp; Probation List</div>
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
		</div>
	);
}

export default Dashboard;
