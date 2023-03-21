import useGetColumns from '../../../../../common/Columns';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';

import styles from './styles.module.css';

function Dashboard({
	params, activeTab, setPage = () => {},
	setItem = () => {}, setOpenLogModal = () => {},
	setType = () => {}, setOpenUpdate = () => {},
}) {
	const dataList = {
		1: [{
			name            : 'apple',
			id              : '1',
			designation     : 'fruit',
			manager_name    : 'apple_tree',
			employee_status : 'exited',
			is_pip          : true,
		},
		{
			name            : 'mango',
			id              : '2',
			designation     : 'fruit',
			manager_name    : 'mango_tree',
			employee_status : 'employed',
			is_pip          : true,
		}],
		2: [{
			name            : 'lemon',
			id              : '3',
			designation     : 'fruit',
			manager_name    : 'lemon_tree',
			employee_status : 'probation',
			is_pip          : false,
		},
		{
			name            : 'carrot',
			id              : '5',
			designation     : 'vegetable',
			manager_name    : 'carrot_plant',
			employee_status : 'probation',
			is_pip          : true,
		}],
	};

	const columnsToShow = feedbackDataColumns.pipProbationList;
	const columns = useGetColumns({
		columnsToShow,
		activeTab,
		setItem,
		source: 'hr_dashboard',
		setOpenUpdate,
		setType,
		setOpenLogModal,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Header
			</div>

			<div>
				<div className={styles.heading}>PIP &amp; Probation List</div>
				<UserTableData
					columns={columns}
					list={dataList[params.Page]}
					pagination={params.Page}
					page_limit={2}
					setPagination={setPage}
					total_count={4}
				/>

			</div>
		</div>
	);
}

export default Dashboard;
