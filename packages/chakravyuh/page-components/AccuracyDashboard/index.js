import React, { useState } from 'react';

import DashboardView from './Dashboard';
import DrillDownView from './DrillDown';
import Filters from './Filters';
import Heading from './Heading';
import MapView from './MapView';
import styles from './styles.module.css';

const VIEW_MAPPING = {
	dashboard: {
		Component : DashboardView,
		heading   : 'Price Accuracy Dashboard',
	},
	drilldown: {
		Component : DrillDownView,
		heading   : 'Rates Life Cycle',
		backView  : 'dashboard',
	},
	map_view: {
		Component : MapView,
		backView  : 'dashboard',
	},
};

function AccuracyDashboard() {
	const [view, setView] = useState('dashboard');
	const [globalFilters, setGlobalFilters] = useState({
		service_type : 'fcl',
		mode         : null,
		end_date     : new Date(),
		date_diff    : 30,
	});

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
							showFilters={false}
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
