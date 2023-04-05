import useGetColumns from '../../../../../common/Columns';
import Filters from '../../../../../common/Filters';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';

import styles from './styles.module.css';
import useListFiles from './useListFiles';

function UploadedFiles({
	activeTab, logType,
	setItem = () => {},
}) {
	const {
		data:uploadedFilesData = {},
		loading,
		params,
		setParams,
		setPage,
	} = useListFiles({ logType });

	const { list = [], pagination_data = {} } = uploadedFilesData;
	const { total_count } = pagination_data;

	const columnsToShow = feedbackDataColumns.uploadedFiles;
	const columns = useGetColumns({
		columnsToShow,
		activeTab,
		setItem,
		source: 'uploaded_files',
	});

	return (
		<div className={styles.container}>
			<div style={{ marginTop: '16px' }}>
				<Filters
					source="uploaded_files"
					setParams={setParams}
					params={params}
				/>
			</div>
			<UserTableData
				columns={columns}
				loading={loading}
				list={list}
				pagination={params.Page}
				page_limit={params.PageLimit}
				setPagination={setPage}
				total_count={total_count}
			/>
		</div>
	);
}

export default UploadedFiles;
