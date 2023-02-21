import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import FinanceDashBoard from '../FinanceDashBoard';
import { Profile } from '../Profile';
import ServicesUsers from '../Services&Users';

import styles from './styles.module.css';

function MainData({ data = {} }) {
	const [activeTab, setActiveTab] = useState('local_rates');

	console.log('data::::', data);
	return (

		<div className={styles.main}>

			<Tabs
				activeTab={activeTab}
				themeType="primary-vertical"
				onChange={setActiveTab}
				className={styles.change}

			>
				<TabPanel name="local_rates" title="Services & Users">
					<div><ServicesUsers /></div>
				</TabPanel>

				<TabPanel name="suggested_rates" title="Profile">
					<div><Profile data={data} /></div>
				</TabPanel>

				<TabPanel name="freight_bookings" title="Finance DashBoard &emsp;&emsp; ">
					<div><FinanceDashBoard /></div>
				</TabPanel>
			</Tabs>

		</div>
	);
}

export default MainData;
