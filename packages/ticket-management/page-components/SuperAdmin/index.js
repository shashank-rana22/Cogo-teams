import { Tabs, TabPanel, DateRangepicker } from '@cogoport/components';
import { subtractDays } from '@cogoport/utils';
import { useState } from 'react';

import FilterTicketsSection from '../../common/FilterTicketsSection';

import Dashboard from './Dashboard';
import styles from './styles.module.css';

const NO_OF_DAYS_WEEK = 7;

function SuperAdmin() {
	const [activeTab, setActiveTab] = useState('dashboard');
	const [refreshList, setRefreshList] = useState({
		Open      : false,
		Pending   : false,
		Escalated : false,
		Closed    : false,
	});
	const [date, setDate] = useState({
		startDate : subtractDays(new Date(), NO_OF_DAYS_WEEK),
		endate    : new Date(),
	});

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
					<FilterTicketsSection type="admin" refreshList={refreshList} setRefreshList={setRefreshList} />
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
