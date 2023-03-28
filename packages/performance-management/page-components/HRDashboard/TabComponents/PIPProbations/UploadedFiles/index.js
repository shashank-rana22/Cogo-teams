import useGetColumns from '../../../../../common/Columns';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';
import useListLogs from '../../../../../hooks/useListLogs';

import styles from './styles.module.css';

function UploadedFiles({
	activeTab,
	setItem = () => {},
}) {
	// const dataList = {
	// 	1: [{
	// 		name                : 'apple',
	// 		id                  : '1',
	// 		number_of_employees : 220,
	// 		hr_manager_name     : 'apple_tree',
	// 		update              : 'uploading',
	// 		is_pip              : true,
	// 		upload_date        	: new Date(),
	// 	},
	// 	{
	// 		name                : 'mango',
	// 		id                  : '2',
	// 		number_of_employees : 220,
	// 		hr_manager_name     : 'apple_tree',
	// 		update              : 'uploaded',
	// 		is_pip              : false,
	// 		upload_date        	: new Date(),
	// 	}],
	// 	2: [{
	// 		name                : 'lemon',
	// 		id                  : '3',
	// 		number_of_employees : 220,
	// 		hr_manager_name     : 'apple_tree',
	// 		update              : 'error',
	// 		is_pip              : false,
	// 		upload_date        	: new Date(),
	// 	},
	// 	{
	// 		name                : 'carrot',
	// 		id                  : '5',
	// 		number_of_employees : 220,
	// 		hr_manager_name     : 'apple_tree',
	// 		update              : 'uploaded',
	// 		is_pip              : true,
	// 		upload_date        	: new Date(),
	// 	}],
	// };

	const {
		employeeData,
		loading,
		// params,
		// setParams,
		setPage,
	} = useListLogs(true);

	const { list = [], pagination_data = {} } = employeeData;
	const { page_limit, page, total_count } = pagination_data;

	const columnsToShow = feedbackDataColumns.uploadedFiles;
	const columns = useGetColumns({
		columnsToShow,
		activeTab,
		setItem,
		source: 'hr_dashboard',
	});

	return (
		<div className={styles.container}>
			<div className={styles.heading}>PIP &amp; Probation List</div>
			<UserTableData
				columns={columns}
				loading={loading}
				list={list}
				pagination={page}
				page_limit={page_limit}
				setPagination={setPage}
				total_count={total_count}
			/>
		</div>
	);
}

export default UploadedFiles;
