import React, { useState } from 'react';

import Header from './Header';
import useGetListRiskProne from './hooks/useGetListRiskProne';
import useGetRiskProneStats from './hooks/useGetRiskProneShipmentStats';
import RiskProneShipments from './RiskProneShipments';
import styles from './styles.module.css';

function RiskMangement() {
	const [activeTab, setActiveTab] = useState('container_movement');

	const { data, loading, filters, setFilters } = useGetListRiskProne({ activeTab });
	const {
		statsData,
		statsLoading,
	} = useGetRiskProneStats();

	return (
		<div>
			<div className={styles.header}>Risk Mangement</div>
			<div className={styles.container}>
				FCL
			</div>
			<Header data={statsData} loading={statsLoading} />
			<RiskProneShipments
				data={data}
				statsData={statsData}
				statsLoading={statsLoading}
				loading={loading}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				filters={filters}
				setFilters={setFilters}
			/>
		</div>
	);
}

export default RiskMangement;
