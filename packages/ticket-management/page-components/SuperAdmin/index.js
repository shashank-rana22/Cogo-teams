import { Tabs, TabPanel, DateRangepicker } from '@cogoport/components';
import { useState } from 'react';

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
			</Tabs>

			<div className={styles.date_filter}>
				<DateRangepicker name="date" onChange={setDate} value={date} isPreviousDaysAllowed />
			</div>
		</div>

	);
}

export default SuperAdmin;
