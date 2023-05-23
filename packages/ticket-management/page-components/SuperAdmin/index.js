import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import AllTickets from './AllTickets';
import Configurations from './Configurations';
import Dashboard from './Dashboard';
import styles from './styles.module.css';

function SuperAdmin() {
	const [activeTab, setActiveTab] = useState('dashboard');

	return (
		<>
			<div className={styles.title}>Ticket Management</div>
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
					<Dashboard />
				</TabPanel>
				<TabPanel
					name="all_tickets"
					title="All Tickets"
				>
					<AllTickets />
				</TabPanel>
				<TabPanel
					name="configurations"
					title="Configurations"
				>
					<Configurations />
				</TabPanel>

			</Tabs>
		</>

	);
}

export default SuperAdmin;
