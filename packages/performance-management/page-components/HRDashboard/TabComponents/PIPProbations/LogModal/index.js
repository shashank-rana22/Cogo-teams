import { Input } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetColumns from '../../../../../common/Columns';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';
import useListReportees from '../../../../../hooks/useListReportees';
import DecisionModal from '../../../DecisionModal';

import styles from './styles.module.css';

function LogModal({
	item = {}, setItem = () => {}, setType = () => {},
	show, setShow = () => {}, setDisableNext = () => {},
}) {
	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	// const { employeeData = {}, loading = false, params, setPage } = useListReportees({ searchValue: query });
	const {
		params,
		feedbackData,
		loading = false,
		setPage,
	} = useListReportees({
		searchValue: query,
	});
	const { list: newTeamList = [], pagination_data = {} } = feedbackData;
	const { total_count = '' } = pagination_data;
	useEffect(() => debounceQuery(searchValue), [debounceQuery, searchValue]);

	const columnsToShow = feedbackDataColumns.logModal;
	const columns = useGetColumns({ columnsToShow, source: 'log_modal', setItem, setType });

	return (
		<div>
			{isEmpty(item) ? (
				<>
					<div className={styles.name_input}>
						<Input placeholder="Search by Name..." value={searchValue} onChange={setSearchValue} />
					</div>

					<UserTableData
						columns={columns}
						list={newTeamList}
						loading={loading}
						pagination={params.Page}
						page_limit={params.page_limit}
						total_count={total_count}
						setPagination={setPage}
					/>
				</>
			) : (
				<DecisionModal
					item={item}
					setItem={setItem}
					// type={type}
					type="cerate"
					// params={pipParams}
					// setParams={setPipParams}
					show={show}
					setShow={setShow}
					setDisableNext={setDisableNext}
				/>
			)}

		</div>
	);
}

export default LogModal;
