import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

function AttendanceLeaveDashboard() {
	const [activeTab, setActiveTab] = useState('attendance');
	return (
		<div>
			<div>
				<h1>
					Attendance & Leaves
				</h1>
			</div>
			<div style={{ margin: 20 }}>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="attendance" title="Attendance">
						<div>This is Attendance</div>
					</TabPanel>

					<TabPanel name="leaves" title="Leaves">
						<div>This is Leaves</div>
					</TabPanel>

					<TabPanel name="policies" title="Policies">
						<div>This is Policies</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default AttendanceLeaveDashboard;
// Attendance Leaves
