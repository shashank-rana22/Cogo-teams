import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

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
					<div>Dashboard</div>
				</TabPanel>
				<TabPanel
					name="all_tickets"
					title="All Tickets"
				>
					<div>All Tickets</div>
				</TabPanel>
				<TabPanel
					name="configurations"
					title="Configurations"
				>
					<div>configurations</div>
				</TabPanel>

			</Tabs>
		</>

	);
}

export default SuperAdmin;
