import { addDays, subtractDays } from '@cogoport/utils';
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
		heading   : 'Map View',
		backView  : 'dashboard',
	},
};

const MONTH_DAYS = 30;

function AccuracyDashboard() {
	const [view, setView] = useState('dashboard');
	const [globalFilters, setGlobalFilters] = useState({
		service_type : 'fcl',
		parent_mode  : null,
		start_date   : subtractDays(new Date(), MONTH_DAYS),
		end_date     : addDays(new Date(), MONTH_DAYS),
		chartType    : 'trend',
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
				key={heading}
			/>
		</div>
	);
}

export default AccuracyDashboard;
