import { dynamic } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const { main_container, stats_view_container, map_view_container } = styles;

const MapView = dynamic(() => import('./MapView'), { ssr: false });

function AnalyticsDashboard() {
	return (
		<div className={main_container}>
			<div className={stats_view_container} />
			<div className={map_view_container}>
				<MapView />
			</div>

		</div>

	);
}

export default AnalyticsDashboard;
