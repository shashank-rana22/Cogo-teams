import { dynamic } from '@cogoport/next';
import { startOfMonth } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetUsersStats from '../../hooks/useGetUsersStats';

import Stats from './Stats';
import styles from './styles.module.css';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

function AnalyticsDashboard() {
	// const parentDiv = document?.getElementsByClassName('styles_children_container');
	// console.log('parentDiv', parentDiv);

	const [country, setCountry] = useState({});
	const [date, setDate] = useState({
		startDate : startOfMonth(new Date()),
		endDate   : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
	});
	const { userStats = {} } = useGetUsersStats();

	return (
		<div className={styles.main_container}>
			<div className={styles.stats_view_container}>
				<Stats country={country} />
			</div>
			<div className={styles.map_view_container}>
				<MapView setCountry={setCountry} country={country} date={date} setDate={setDate} />
			</div>

		</div>

	);
}

export default AnalyticsDashboard;
