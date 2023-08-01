import { Tabs, TabPanel, DateRangepicker } from '@cogoport/components';
import { subtractDays } from '@cogoport/utils';
import { useState } from 'react';

import FilterTicketsSection from '../../common/FilterTicketsSection';

import Dashboard from './Dashboard';
import styles from './styles.module.css';

const SUBTRACT_DAYS = 7;

function SuperAdmin() {
	const [activeTab, setActiveTab] = useState('dashboard');
	const [refreshList, setRefreshList] = useState({
		Open      : false,
		Pending   : false,
		Escalated : false,
		Closed    : false,
	});
	const [date, setDate] = useState({
		startDate : subtractDays(new Date(), SUBTRACT_DAYS),
		endate    : new Date(),
	});

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={(val) => {
					setActiveTab(val);
					setDate({ startDate: null, endate: null });
				}}
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
					<FilterTicketsSection
						type="admin"
						date={date}
						refreshList={refreshList}
						setRefreshList={setRefreshList}
					/>
				</TabPanel>
			</Tabs>

			<div className={styles.date_filter}>
				<DateRangepicker name="date" onChange={setDate} value={date} isPreviousDaysAllowed />
			</div>
		</div>

	);
}

export default SuperAdmin;
