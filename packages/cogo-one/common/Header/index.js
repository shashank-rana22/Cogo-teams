import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import { cogoOneLogo } from '../../page-components/CogoOneDashboard/constants';

import styles from './styles.module.css';

function Header({ setCalendarType, calendarType }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div>
					<img
						src={cogoOneLogo}
						alt="-"
					/>
				</div>
				<div className={styles.heading_name}>CogoOne Dashboard</div>
			</div>
			<Tabs
				activeTab={calendarType}
				themeType="tertiary"
				onChange={setCalendarType}
			>
				<TabPanel name="day" title="Day" />
				<TabPanel name="week" title="Week" />
				<TabPanel name="month" title="Month" />
			</Tabs>
		</div>
	);
}

export default Header;
