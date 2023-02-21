import { dynamic } from '@cogoport/next';
import { startOfMonth } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetCogoverseDashboard from '../../hooks/useGetCogoverseDashboard';

import Stats from './Stats';
import styles from './styles.module.css';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

function AnalyticsDashboard() {
	const [country, setCountry] = useState({});
	const [date, setDate] = useState({
		startDate : startOfMonth(new Date()),
		endDate   : new Date(),
	});

	const { list = {}, statsLoading = false } = useGetCogoverseDashboard({ country });
	const statsData = list?.fullResponse?.data || {};

	const props = {
		statsData,
		statsLoading,
		setCountry,
		date,
		setDate,
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.stats_view_container}>
				<Stats props={props} />
			</div>
			<div className={styles.map_view_container}>
				<MapView props={props} />
			</div>

		</div>

	);
}

export default AnalyticsDashboard;
