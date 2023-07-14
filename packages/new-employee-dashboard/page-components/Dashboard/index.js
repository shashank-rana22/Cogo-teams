import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import CompanyPolicyDetails from '../CompanyPolicyDetails';
import Day1Download from '../Day1Download';
import Header from '../Header';
import TableView from '../TableView';

import styles from './styles.module.css';

function Dashboard() {
	const [search, setSearch] = useState('');
	const [activeTab, setActiveTab] = useState('new_employee_list');

	return (
		<div className={styles.container}>
			<Header />

			<div className={styles.tab_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="new_employee_list" title="New Hire List">
						<TableView search={search} setSearch={setSearch} />
					</TabPanel>

					<TabPanel name="day_1" title="Day 1 Download">
						<Day1Download />
					</TabPanel>

					<TabPanel name="company_policy" title="Company Policy">
						<CompanyPolicyDetails />
					</TabPanel>
				</Tabs>
			</div>

		</div>
	);
}

export default Dashboard;
