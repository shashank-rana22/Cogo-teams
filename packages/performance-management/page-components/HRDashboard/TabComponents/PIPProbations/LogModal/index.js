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
	item = {},
	source = 'log_modal',
	setItem = () => {},
	setDisableNext = () => {},
}) {
	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();
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
	useEffect(() => setItem({}), []);

	const columnsToShow = [
		...(source === 'log_modal' ? feedbackDataColumns.logModal : feedbackDataColumns.manualFeedbacks)];
	const columns = useGetColumns({ columnsToShow, source, setItem });

	return (
		<div>
			{isEmpty(item) ? (
				<>
					<div className={styles.name_input}>
						<div>Search by Name/COGO-ID...</div>
						<Input placeholder="Type Here..." value={searchValue} onChange={setSearchValue} />
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
					type="create"
					setDisableNext={setDisableNext}
				/>
			)}

		</div>
	);
}

export default LogModal;
