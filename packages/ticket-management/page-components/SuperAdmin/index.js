import { Tabs, TabPanel, DateRangepicker } from '@cogoport/components';
import { useState } from 'react';

import FilterTicketsSection from '../../common/FilterTicketsSection';

import Dashboard from './Dashboard';
import styles from './styles.module.css';

function SuperAdmin() {
	const [activeTab, setActiveTab] = useState('dashboard');
	const [date, setDate] = useState({});

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
				className={styles.tab_panel}
			>
				<TabPanel
					name="dashboard"
					title="Dashboard"
				>
					<Dashboard date={date} />
				</TabPanel>
				<TabPanel
					name="all_tickets"
					title="All Tickets"
				>
					<FilterTicketsSection type="admin" />
				</TabPanel>
			</Tabs>

			{activeTab === 'dashboard' ?	(
				<div className={styles.date_filter}>
					<DateRangepicker name="date" onChange={setDate} value={date} isPreviousDaysAllowed />
				</div>
			) : null}
		</div>

	);
}

export default SuperAdmin;
