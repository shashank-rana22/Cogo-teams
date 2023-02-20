import { dynamic } from '@cogoport/next';
import { startOfMonth } from '@cogoport/utils';
import React, { useState } from 'react';

import Stats from './Stats';
import styles from './styles.module.css';

const { main_container, stats_view_container, map_view_container } = styles;

const MapView = dynamic(() => import('./MapView'), { ssr: false });

function AnalyticsDashboard() {
	const [country, setCountry] = useState({});
	const [date, setDate] = useState({
		startDate : startOfMonth(new Date()),
		endDate   : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
	});
	return (
		<div className={main_container}>
			<div className={stats_view_container}>
				<Stats country={country} />
			</div>
			<div className={map_view_container}>
				<MapView setCountry={setCountry} country={country} date={date} setDate={setDate} />
			</div>

		</div>

	);
}

export default AnalyticsDashboard;
