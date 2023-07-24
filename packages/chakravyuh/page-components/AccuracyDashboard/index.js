import React, { useState } from 'react';

import Heading from '../../common/Heading';

import DashboardView from './Dashboard';
import DrillDownView from './DrillDown';
import Filters from './Filters';
import MapView from './MapView';
import styles from './styles.module.css';

const VIEW_MAPPING = {
	dashboard: {
		Component : DashboardView,
		heading   : 'Price Accuracy Dashboard',
	},
	drilldown: {
		Component : DrillDownView,
		heading   : 'Rates DrillDown',
		backView  : 'dashboard',
	},
	map_view: {
		Component : MapView,
		backView  : 'dashboard',
	},
};

function AccuracyDashboard() {
	const [view, setView] = useState('dashboard');
	const [globalFilters, setGlobalFilters] = useState({ service_type: 'fcl', rate_type: null, time_range: 'all' });

	const { Component, heading, backView } = VIEW_MAPPING[view];
	const showCommons = view !== 'map_view';

	return (
		<div className={styles.container}>
			{showCommons && (
				<>
					<div>
						<Heading
							heading={heading}
							setView={setView}
							backView={backView}
							showFilters
							globalFilters={globalFilters}
							setGlobalFilters={setGlobalFilters}
						/>

					</div>
					<Filters
						globalFilters={globalFilters}
						setGlobalFilters={setGlobalFilters}
					/>
				</>
			)}
			<Component
				setView={setView}
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}
				backView={backView}
			/>
		</div>
	);
}

export default AccuracyDashboard;
