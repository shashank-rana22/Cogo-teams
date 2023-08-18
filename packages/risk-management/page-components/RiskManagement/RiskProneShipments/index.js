import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import PieChart from './PieChart';
import ShipmentId from './ShipmentId';
import styles from './styles.module.css';

const getTabsMapping = (stats = {}) => {
	const {
		container_movement_count = '',
		bl_do_release_count = '', both_count = '',
	} = stats;

	return [
		{ name: 'container_movement', title: 'Container Movement', badge: container_movement_count },
		{ name: 'bl_do', title: 'BL/DO Release', badge: bl_do_release_count },
		{ name: 'both', title: 'Both', badge: both_count },
	];
};

function RiskProneShipments({
	data = {}, statsData = {}, statsLoading = false, loading = false, activeTab = '',
	setActiveTab = () => {}, filters = {}, setFilters = () => {},
	getDashboardData = () => {}, getDahboardStatsData = () => {},
}) {
	const { stats } = statsData;

	const tabMappings = getTabsMapping(stats);

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.header}>
					Risk Prone Shipments
				</div>
				<div className={styles.hr} />
			</div>
			<div className={styles.tab}>
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					{tabMappings.map((tab) => (
						<TabPanel
							key={tab.name}
							name={tab.name}
							title={tab.title}
							badge={tab.badge}
						/>
					))}
				</Tabs>
			</div>
			{activeTab !== 'both'
			&& (
				<div className={styles.tab}>
					<PieChart activeTab={activeTab} chartData={statsData} loading={statsLoading} />
				</div>
			)}
			<div className={styles.tab}>
				<ShipmentId
					data={data}
					loading={loading}
					filters={filters}
					setFilters={setFilters}
					activeTab={activeTab}
					getDashboardData={getDashboardData}
					getDahboardStatsData={getDahboardStatsData}
				/>
			</div>
		</div>
	);
}

export default RiskProneShipments;
