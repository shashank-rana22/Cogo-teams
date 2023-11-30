import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import PaginationBar from '../common/PaginationBar';
import { TAB_MAPPING } from '../configs/TAB_MAPPING';
import useGetIncidentMangement from '../hooks/useGetIncidentManagement';
import SelectFilter from '../SelectFilters';
import { COLUMNS_MAPPING } from '../utils/getColumns';

import List from './List';
import styles from './styles.module.css';

function Dashboard() {
	const { query, push } = useRouter();
	const { activeIncidentTab } = query;
	const [activeTab, setActiveTab] = useState(activeIncidentTab || 'requested');
	const [payload, setPayload] = useState(null);
	const [isSortActive, setIsSortActive] = useState(null);

	const { globalFilters, setGlobalFilters, data, loading, refetch } = useGetIncidentMangement({
		activeTab,
		payload,
	});

	const { list = [], paginationData = {} } = data || {};

	useEffect(() => {
		setPayload(null);
	}, [activeTab]);

	const columns = COLUMNS_MAPPING(
		{
			setActiveTab,
			isSortActive,
			setIsSortActive,
			setGlobalFilters,
			refetch,
			setPayload,
		},
	)[activeTab];

	const handleTabChange = (v) => {
		setActiveTab(v);
		push(
			'/my-incident/[activeIncidentTab]',
			`/my-incident/${v}`,
		);
	};

	return (
		<>
			<h2>My Incidents</h2>

			<div className={styles.tabs_container}>
				<Tabs fullWidth activeTab={activeTab} themeType="primary" onChange={handleTabChange}>
					{TAB_MAPPING.map((item) => {
						const { name = '', title = '', key = '' } = item;

						return (
							<TabPanel key={name} name={name} title={title} badge={data?.statsData?.[key]} />
						);
					})}
				</Tabs>
			</div>

			<SelectFilter globalFilters={globalFilters} setGlobalFilters={setGlobalFilters} activeTab={activeTab} />

			<List
				list={list}
				columns={columns}
				loading={loading}
			/>

			<PaginationBar
				data={paginationData}
				onPageChange={(val) => setGlobalFilters({ ...globalFilters, pageIndex: val })}
			/>
		</>
	);
}

export default Dashboard;
