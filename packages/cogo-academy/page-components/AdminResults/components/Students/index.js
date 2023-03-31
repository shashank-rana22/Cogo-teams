import { Pagination, Table, TabPanel, Tabs } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import EmptyState from '../../../CreateModule/components/EmptyState';
import Filters from '../../commons/Filters';

import useStudentWiseTestResult from './hooks/useStudentWiseTestResult';
import styles from './styles.module.css';
import getTableColumns from './TableColumns';

function StudentsComponent({ test_id }) {
	const {
		data = {},
		loading,
		refetch,
		activeTab,
		sortFilter,
		setSortFilter,
		debounceQuery,
		setActiveTab,
		filter,
		setFilter,
		searchValue,
		setSearchValue,
		params,
		setParams,
		STUDENTS_MAPPING,
	} = useStudentWiseTestResult({ test_id });

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
						const { title, index } = STUDENTS_MAPPING[item];

						return (
							<TabPanel
								key={item}
								name={item}
								badge={stats[index]?.[item] || '0'}
								title={title}
							/>
						);
					})}
				</Tabs>
			</div>

			<Filters
				filter={filter}
				setFilter={setFilter}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				debounceQuery={debounceQuery}
				activeTab={activeTab}
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
