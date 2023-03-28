import { Pagination, Table, TabPanel, Tabs } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import Filters from '../../commons/Filters';

import styles from './styles.module.css';
import tableColumns from './TableColumns';

function StudentsComponent({ test_id }) {
	const [activeTab, setActiveTab] = useState('');
	const { debounceQuery, query } = useDebounceQuery();

	const [params, setParams] = useState({});
	const [filter, setFilter] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [sortType, setSortType] = useState('');
	const [searchValue, setSearchValue] = useState('');

	const [{ data, loading }, refetch] = useRequest({
		method : 'GET',
		url    : '/list_admin_student_wise_test_result',
		params : {
			test_id,
			sort_by     : sortBy,
			sort_type   : sortType,
			filters     : { final_result: filter },
			search_term : query,
			...params,
		},
	}, { manual: false });

	const { page_limit = 0, total_count = 0, list } = data || {};

	const columns = tableColumns({ sortType, sortBy, setSortBy, setSortType });

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

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
					<TabPanel name="local_rates" title="Appeared" badge={3} />

					<TabPanel name="suggested_rates" title="Not Appeared" badge={5} />
				</Tabs>
			</div>

			<Filters
				filter={filter}
				setFilter={setFilter}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

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
		</div>
	);
}

export default StudentsComponent;
