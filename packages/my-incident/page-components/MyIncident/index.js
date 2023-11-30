// import { Pagination, Tabs, TabPanel } from '@cogoport/components';
// import { useRouter } from '@cogoport/next';
// import { isEmpty } from '@cogoport/utils';
// import React, { useState, useEffect } from 'react';

// import EmptyState from './common/EmptyState';
// import { TAB_MAPPING } from './configs/TAB_MAPPING';
// import useGetIncidentMangement from './hooks/useGetIncidentManagement';
// import SelectFilter from './SelectFilters';
// import styles from './styles.module.css';
// import StyledTable from './Table';
// import { COLUMNS_MAPPING } from './utils/getColumns';
import Dashboard from './Dashboard';

function MyIncident() {
	// const { query, push } = useRouter();
	// const { activeIncidentTab } = query;
	// const [activeTab, setActiveTab] = useState(activeIncidentTab || 'requested');
	// const [payload, setPayload] = useState(null);
	// const [isSortActive, setIsSortActive] = useState(null);

	// const { globalFilters, setGlobalFilters, data, loading, refetch } = useGetIncidentMangement({
	// 	activeTab,
	// 	payload,
	// });

	// const { list = [], paginationData = {} } = data || {};
	// const { pageIndex, pageSize, total } = paginationData || {};

	// useEffect(() => {
	// 	setPayload(null);
	// }, [activeTab]);

	// const columns = COLUMNS_MAPPING(
	// 	{
	// 		setActiveTab,
	// 		isSortActive,
	// 		setIsSortActive,
	// 		setGlobalFilters,
	// 		refetch,
	// 		setPayload,
	// 	},
	// )[activeTab];

	// const handleTabChange = (v) => {
	// 	setActiveTab(v);
	// 	push(
	// 		'/my-incident/[activeIncidentTab]',
	// 		`/my-incident/${v}`,
	// 	);
	// };

	return (
	// <>
	// 	<h2>My Incidents</h2>

	// 	<div className={styles.tabs_container}>
	// 		<Tabs fullWidth activeTab={activeTab} themeType="primary" onChange={handleTabChange}>
	// 			{TAB_MAPPING.map((item) => {
	// 				const { name = '', title = '', key = '' } = item;

	// 				return (
	// 					<TabPanel key={name} name={name} title={title} badge={data?.statsData?.[key]} />
	// 				);
	// 			})}
	// 		</Tabs>
	// 	</div>

	// 	<SelectFilter globalFilters={globalFilters} setGlobalFilters={setGlobalFilters} activeTab={activeTab} />

	// 	<div className={styles.list_container}>
	// 		{!isEmpty(list)
	// 			? <StyledTable data={list} columns={columns} loading={loading} />
	// 			: <EmptyState />}
	// 	</div>

		// 	{list.length > 0
		// 	&& (
		// 		<div className={styles.pagination_container}>
		// 			<Pagination
		// 				type="number"
		// 				currentPage={pageIndex}
		// 				totalItems={total}
		// 				pageSize={pageSize}
		// 				onPageChange={(val) => setGlobalFilters({ ...globalFilters, pageIndex: val })}
		// 			/>
		// 		</div>
		// 	)}
		// </>
		<Dashboard />
	);
}
export default MyIncident;
