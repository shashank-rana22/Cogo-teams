import { Tabs, TabPanel, Button } from '@cogoport/components';
import { IcMLiveChat } from '@cogoport/icons-react';
import React, { useState } from 'react';

import AttendanceManagement from '../AttendanceManagement';
import LeavesManagement from '../LeavesManagement';
import Policies from '../Policies';
import TeamAttendance from '../TeamAttendance';

import RequestModal from './RequestModal';
import styles from './styles.module.css';

function AttendanceLeaveDashboard() {
	const [activeTab, setActiveTab] = useState('attendance');
	const [show, setShow] = useState(false);
	const MANAGER = true;
	const onClose = () => {
		setShow(false);
	};

	return (
		<div>
			<div className={styles.heading}>
				<h1>
					Attendance & Leaves
				</h1>
				{MANAGER ? (
					<Button
						size="md"
						themeType="primary"
						className={styles.requestBtn}
						onClick={() => { setShow(true); }}
					>
						My Requests
						<IcMLiveChat />

					</Button>
				) : (
					<Button
						size="md"
						themeType="primary"
						className={styles.requestBtn}
						onClick={() => { setShow(true); }}
					>
						My Inbox
						<IcMLiveChat />

					</Button>
				)}

			</div>

			<div className={`${styles.modal_container} ${styles[show ? 'show' : 'hide']}`}>
				{show && <RequestModal show={show} onClose={onClose} />}
			</div>

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
							<Policies />
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
// Attendance Leaves
