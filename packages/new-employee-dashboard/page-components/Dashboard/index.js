import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import Day1Download from '../Day1Download';
import Header from '../Header';
import TableView from '../TableView';

import styles from './styles.module.css';

function Dashboard() {
	const [search, setSearch] = useState('');
	const [activeTab, setActiveTab] = useState('new_employee_list');

	return (
		<div className={styles.container}>
			<Header search={search} setSearch={setSearch} />
			<div className={styles.tab_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="new_employee_list" title="New Employee List">
						<TableView search={search} />
					</TabPanel>

					<TabPanel name="day_1" title="Day 1 Download">
						<Day1Download />
					</TabPanel>

					<TabPanel name="company_policy" title="Company Policy">
						<div>Company Policy</div>

					</TabPanel>
				</Tabs>
			</div>

		</div>
	);
}

export default Dashboard;
