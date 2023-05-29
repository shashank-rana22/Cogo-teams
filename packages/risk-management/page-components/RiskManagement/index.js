import React, { useState } from 'react';

import Header from './Header';
import useGetListRiskProne from './hooks/useGetListRiskProne';
import RiskProneShipments from './RiskProneShipments';
import styles from './styles.module.css';

function RiskMangement() {
	const [activeTab, setActiveTab] = useState('container_movement');

	const { data, loading, filters, setFilters } = useGetListRiskProne({ activeTab });

	return (
		<div>
			<div className={styles.header}>Risk Mangement</div>
			<Header data={data} loading={loading} />
			<RiskProneShipments
				data={data}
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
