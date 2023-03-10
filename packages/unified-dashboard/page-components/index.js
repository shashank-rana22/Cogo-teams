/* eslint-disable import/no-unresolved */
import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import BookingAnalysis from './BookingAnalysis';
import Header from './Header';
import Profitability from './Profitability';
import RevenueAnalysis from './RevenueAnalysis';
import RevenueVisualization from './RevenueVizualisation';
import SalesFunnel from './SalesFunnel';
import SalesOverall from './SalesOverall';
import styles from './styles.module.css';

function UnifiedDashboard() {
	const [headerFilters, setHeaderFilters] = useState({ currency: false });
	const [activeTab, setActiveTab] = useState('unified_dashboard');
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				themeType="primary"
			>
				<TabPanel
					name="unified_dashboard"
					title="Unified Dashboard"
				>
					<Header
						headerFilters={headerFilters}
						setHeaderFilters={setHeaderFilters}
					/>
					<BookingAnalysis headerFilters={headerFilters} />
					<RevenueAnalysis headerFilters={headerFilters} />
					<RevenueVisualization headerFilters={headerFilters} />
					<SalesOverall headerFilters={headerFilters} />
					<SalesFunnel headerFilters={headerFilters} />
					<Profitability headerFilters={headerFilters} />
				</TabPanel>
			</Tabs>
		</div>

	);
}

export default UnifiedDashboard;
