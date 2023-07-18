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
	const [filters, setFilters] = useState({ classType: 'sea' });

	const { Component, heading, backView } = VIEW_MAPPING[view];
	const showCommons = view !== 'map_view';

	return (
		<div className={styles.container}>
			{showCommons && (
				<>
					<Heading
						heading={heading}
						setView={setView}
						backView={backView}
					/>
					<Filters />
				</>
			)}
			<Component
				setView={setView}
				filters={filters}
				setFilters={setFilters}
				backView={backView}
			/>
		</div>
	);
}

export default AccuracyDashboard;
