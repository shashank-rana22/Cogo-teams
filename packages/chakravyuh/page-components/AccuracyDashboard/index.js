import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useState } from 'react';

import DashboardView from './Dashboard';
import DrillDownView from './DrillDown';
import Filters from './Filters';
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
};

function AccuracyDashboard() {
	const [view, setView] = useState('dashboard');
	const [filters, setFilters] = useState({});

	const { Component, heading, backView } = VIEW_MAPPING[view];

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				{backView && (
					<IcMArrowBack
						onClick={() => setView(backView)}
					/>
				)}
				<h1 className={styles.heading}>{heading}</h1>
			</div>
			<Filters />
			<Component setView={setView} filters={filters} setFilters={setFilters} />
		</div>
	);
}

export default AccuracyDashboard;
