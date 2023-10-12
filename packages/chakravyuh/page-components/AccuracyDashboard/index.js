import React, { useState } from 'react';

import { DEFAULT_GLOBAL_FILTERS } from '../../constants/default_global_filters';

import DashboardView from './Dashboard';
import DynamicGraph from './DynamicGraph';
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
		Component : DynamicGraph,
		heading   : 'Rates Life Cycle',
		backView  : 'dashboard',
	},
	map_view: {
		Component : MapView,
		heading   : 'Map View',
		backView  : 'dashboard',
	},
};

function AccuracyDashboard() {
	const [view, setView] = useState('dashboard');
	const [globalFilters, setGlobalFilters] = useState(DEFAULT_GLOBAL_FILTERS);

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
						view={view}
					/>
				</>
			)}
			<Component
				setView={setView}
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}
				backView={backView}
				key={heading}
			/>
		</div>
	);
}

export default AccuracyDashboard;
