import { Input } from '@cogoport/components';
import { useForm, SelectController, useDebounceQuery } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useGetColumns from '../../../../../../../common/Columns';
import UserTableData from '../../../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../../../constants/feedback-data-columns';
import useListReportees from '../../../../../../../hooks/useListReportees';
import useListReassignControls from '../../../../../../../utils/list-reassign-manager-controls';

import styles from './styles.module.css';

function EmployeesTable({ source = 'log_modal', setItem = () => {} }) {
	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		feedbackData,
		loading = false,
		setPage,
		setParams,
		params,
	} = useListReportees({
		searchValue: query,
	});

	const { watch, control } = useForm();

	const managerId = watch('manager_id');

	const { list: newTeamList = [], pagination_data = {} } = feedbackData;
	const { total_count = '' } = pagination_data;

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			ManagerID: managerId || undefined,
		}));
	}, [managerId, setParams]);

	useEffect(() => debounceQuery(searchValue), [debounceQuery, searchValue]);

	const cogoUsersControl = useListReassignControls();

	const columnsToShow = [
		...(source === 'log_modal' ? feedbackDataColumns.logModal : feedbackDataColumns.manualFeedbacks)];
	const columns = useGetColumns({ columnsToShow, source, setItem });
	return (
		<>
			<div className={styles.name_input}>
				<div>
					<div>Search by Name/COGO-ID...</div>
					<Input
						placeholder="Type Here..."
						value={searchValue}
						onChange={setSearchValue}
					/>
				</div>
				<div>
					<div>Search by Manager</div>
					<SelectController
						{...cogoUsersControl}
						control={control}
						placeholder="Select Manager..."
						isClearable
					/>
				</div>
			</div>

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
