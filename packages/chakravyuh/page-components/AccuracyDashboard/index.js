import React, { useState } from 'react';

import Heading from '../../common/Heading';

import DashboardView from './Dashboard';
import DrillDownView from './DrillDown';
import Filters from './Filters';
import MapView from './MapView';
import SupplyRates from './RatesList';
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
	const [filters, setFilters] = useState({ service_type: 'fcl', pieChartView: 'default' });

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
					<Filters
						filters={filters}
						setFilters={setFilters}
					/>
				</>
			)}
			<Component
				setView={setView}
				filters={filters}
				setFilters={setFilters}
				backView={backView}
			/>
			<SupplyRates filters={filters} />
		</div>
	);
}

export default AccuracyDashboard;
