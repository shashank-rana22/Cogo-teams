import useGetColumns from '../../../../../common/Columns';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';

import styles from './styles.module.css';

function UploadedFiles({
	params, activeTab, setPage = () => {},
	setItem = () => {},
}) {
	const dataList = {
		1: [{
			name                : 'apple',
			id                  : '1',
			number_of_employees : 220,
			hr_manager_name     : 'apple_tree',
			update              : 'uploading',
			is_pip              : true,
			upload_date        	: new Date(),
		},
		{
			name                : 'mango',
			id                  : '2',
			number_of_employees : 220,
			hr_manager_name     : 'apple_tree',
			update              : 'uploaded',
			is_pip              : false,
			upload_date        	: new Date(),
		}],
		2: [{
			name                : 'lemon',
			id                  : '3',
			number_of_employees : 220,
			hr_manager_name     : 'apple_tree',
			update              : 'error',
			is_pip              : false,
			upload_date        	: new Date(),
		},
		{
			name                : 'carrot',
			id                  : '5',
			number_of_employees : 220,
			hr_manager_name     : 'apple_tree',
			update              : 'uploaded',
			is_pip              : true,
			upload_date        	: new Date(),
		}],
	};

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
				list={dataList[params.Page]}
				pagination={params.Page}
				page_limit={2}
				setPagination={setPage}
				total_count={4}
			/>
		</div>
	);
}

export default UploadedFiles;
