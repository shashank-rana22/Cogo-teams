import useGetColumns from '../../../../../common/Columns';
import Filters from '../../../../../common/Filters';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';

import useListFiles from './useListFiles';

function UploadedFiles({
	activeTab,
	setItem = () => {},
}) {
	const {
		data:uploadedFilesData = {},
		loading,
		params,
		setParams,
		setPage,
	} = useListFiles(true);

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
		<div>
			<Filters source="uploaded_files" setParams={setParams} params={params} />
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
