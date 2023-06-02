import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import PieChart from './PieChart';
import ShipmentId from './ShipmentId';
import styles from './styles.module.css';

function RiskProneShipments({
	data, statsData, statsLoading, loading, activeTab, setActiveTab, filters, setFilters,
}) {
	const { stats } = statsData || {};
	const {
		container_movement_count = '',
		bl_do_release_count = '', both_count = '',
	} = stats || {};
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
					<TabPanel name="container_movement" title="Container Movement" badge={container_movement_count} />

					<TabPanel name="bl_do_release" title="BL/DO Release" badge={bl_do_release_count} />

					<TabPanel name="both" title="Both" badge={both_count} />
				</Tabs>
			</div>
			<div className={styles.tab}>
				<PieChart activeTab={activeTab} chartData={statsData} loading={statsLoading} />
			</div>
			<div className={styles.tab}>
				<ShipmentId
					data={data}
					loading={loading}
					filters={filters}
					setFilters={setFilters}
					activeTab={activeTab}
				/>
			</div>
		</div>
	);
}

export default RiskProneShipments;
