import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import AttendanceManagement from '../AttendanceManagement';
import LeavesManagement from '../LeavesManagement';
import TeamAttendance from '../TeamAttendance';

import styles from './styles.module.css';

function AttendanceLeaveDashboard() {
	const [activeTab, setActiveTab] = useState('attendance');
	return (
		<div className={styles.container}>
			<h1>
				Attendance & Leaves
			</h1>
			<div>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="attendance" title="Attendance">
						<div className={styles.tab_panel}>
							<AttendanceManagement />
						</div>
					</TabPanel>

					<TabPanel name="leaves" title="Leaves">
						<div className={styles.tab_panel}>
							<LeavesManagement />
						</div>
					</TabPanel>

					<TabPanel name="policies" title="Policies">
						<div className={styles.tab_panel}>
							This is Policies
						</div>
					</TabPanel>

					<TabPanel name="my_team" title="My Team">
						<div className={styles.tab_panel}>
							<TeamAttendance />
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default AttendanceLeaveDashboard;
