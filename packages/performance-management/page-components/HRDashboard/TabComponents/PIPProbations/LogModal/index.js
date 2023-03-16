import { Tabs, TabPanel, Pagination, Input } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetColumns from '../../../../../common/Columns';
import UserTableData from '../../../../../common/UserTableData';
import feedbackDataColumns from '../../../../../constants/feedback-data-columns';
import useListEmployees from '../../../../../hooks/useListEmployees';
import AllLogs from '../../../AllLogs';
import NewLog from '../../../NewLog';

import styles from './styles.module.css';

function LogModal({ item = {}, setItem = () => {} }) {
	const [searchValue, setSearchValue] = useState('');
	const [activeTab, setActiveTab] = useState('new');
	const { query = '', debounceQuery } = useDebounceQuery();

	const { employeeData = {}, loading = false, params, setPage } = useListEmployees({ searchValue: query });

	useEffect(() => debounceQuery(searchValue), [debounceQuery, searchValue]);

	const columnsToShow = feedbackDataColumns.logModal;
	const columns = useGetColumns({ columnsToShow, source: 'log_modal', setItem });

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

	return (
		<div>
			{isEmpty(item) ? (
				<>
					<div className={styles.name_input}>
						<Input placeholder="Search by Name..." value={searchValue} onChange={setSearchValue} />
					</div>

					<UserTableData
						columns={columns}
						list={dataList[params.Page]}
						pagination={params.Page}
						page_limit={2}
						setPagination={setPage}
						total_count={4}
					/>
				</>
			) : (
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="new" title="New Log">
						<NewLog />
					</TabPanel>
					<TabPanel name="all" title="All Logs">
						<AllLogs />
					</TabPanel>
				</Tabs>
			)}

		</div>
	);
}

export default LogModal;
