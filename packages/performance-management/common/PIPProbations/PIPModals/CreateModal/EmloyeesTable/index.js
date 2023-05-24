import { useState, useEffect } from 'react';

import feedbackDataColumns from '../../../../../constants/feedback-data-columns';
import useListReportees from '../../../../../hooks/useListReportees';
import useGetColumns from '../../../../Columns';
import Filters from '../../../../Filters';
import UserTableData from '../../../../UserTableData';

function EmployeesTable({ source = 'log_modal', setItem = () => {} }) {
	const [refetchReportees, setRefetchReportees] = useState(false);

	const {
		feedbackData,
		loading = false,
		setPage,
		setParams,
		params,
		fetchReportees,
	} = useListReportees({});

	const { list: newTeamList = [], pagination_data = {} } = feedbackData;
	const { total_count = '' } = pagination_data;

	const columnsToShow = [
		...(source === 'log_modal' ? feedbackDataColumns.logModal : feedbackDataColumns.manualFeedbacks)];

	const columns = useGetColumns({ setRefetchReportees, columnsToShow, source, setItem });

	useEffect(() => {
		if (refetchReportees) {
			fetchReportees();
		}
		setRefetchReportees(false);
	}, [fetchReportees, refetchReportees]);

	return (
		<>
			<Filters
				params={params}
				setParams={setParams}
				source="manual_feedback"
			/>

			<UserTableData
				columns={columns}
				list={newTeamList}
				loading={loading}
				pagination={params.Page}
				page_limit={params.PageLimit}
				total_count={total_count}
				setPagination={setPage}
			/>
		</>
	);
}

export default EmployeesTable;
