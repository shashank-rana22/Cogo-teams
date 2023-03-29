import { Pagination, Table, TabPanel, Tabs } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../CreateModule/components/EmptyState';
import Filters from '../../commons/Filters';

import styles from './styles.module.css';
import getTableColumns from './TableColumns';

function StudentsComponent({ test_id }) {
	const [activeTab, setActiveTab] = useState('appeared');

	const [params, setParams] = useState({});
	const [filter, setFilter] = useState('');
	const [sortFilter, setSortFilter] = useState({});
	const [setSearchValue] = useState('');

	const { debounceQuery, query } = useDebounceQuery();

	const { sortBy, sortType } = sortFilter || {};

	const STUDENTS_MAPPING = {
		appeared: {
			url     : '/list_admin_student_wise_test_result',
			payload : {
				test_id,
				sort_by     : sortBy,
				sort_type   : sortType,
				filters     : { final_result: filter },
				search_term : query,
				...params,
			},
			title: 'Appeared',
		},
		not_appeared: {
			url     : '/list_not_appeared_users',
			payload : {
				test_id,
			},
			title: 'Not Appeared',
		},
	};

	const { payload, url: api_url = '' } = STUDENTS_MAPPING[activeTab];

	const [{ data, loading }, refetch] = useRequest({
		method : 'GET',
		url    : api_url,
		params : { ...payload },
	}, { manual: false });

	const { stats = [], page_limit = 0, total_count = 0, list } = data || {};

	const columns = getTableColumns({ sortFilter, setSortFilter, activeTab });

	useEffect(() => {
		refetch();
	}, [params, refetch]);

	return (
		<div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					{Object.keys(STUDENTS_MAPPING).map((item) => {
						const { title } = STUDENTS_MAPPING[item];

						return (
							<TabPanel
								key={item}
								name={item}
								badge={stats[0]?.[item] || '0'}
								title={title}
							/>
						);
					})}
				</Tabs>
			</div>

			<Filters
				filter={filter}
				setFilter={setFilter}
				setSearchValue={setSearchValue}
				debounceQuery={debounceQuery}
			/>

			{!loading && isEmpty(data?.list)
				? <EmptyState />
				: (
					<div className={styles.table_container}>
						<Table
							className={styles.table_container}
							data={list || []}
							columns={columns}
							loading={loading}
						/>

						{total_count > page_limit ? (
							<div className={styles.pagination_container}>
								<Pagination
									type="table"
									currentPage={params?.page}
									totalItems={total_count}
									pageSize={page_limit}
									onPageChange={(val) => setParams((prev) => ({ ...prev, page: val }))}
								/>
							</div>
						) : null}
					</div>
				)}
		</div>
	);
}

export default StudentsComponent;
