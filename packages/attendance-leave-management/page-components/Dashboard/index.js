import { Tabs, TabPanel, Button } from '@cogoport/components';
import { IcMLiveChat } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import useGetCheckinStats from '../../hooks/useGetCheckinStats';
import { getCurrentLocation } from '../../utils/getCurrentLocation';
import AttendanceManagement from '../AttendanceManagement';
import LeavesManagement from '../LeavesManagement';
import Policies from '../Policies';
import TeamAttendance from '../TeamAttendance';

import LeaveRequest from './LeaveRequest';
import styles from './styles.module.css';

const MANAGER = true;

function AttendanceLeaveDashboard() {
	const [activeTab, setActiveTab] = useState('attendance');
	const [showInbox, setShowInbox] = useState(false);

	const [coords, setCoords] = useState(null);

	useEffect(() => {
		getCurrentLocation()
			.then((location) => {
				setCoords(location);
			})
			.catch((error) => {
				console.error('Error getting location:', error);
			});
	}, []);

	const { data, loading, refetch } = useGetCheckinStats(coords);

	const { is_manager } = data || {};

	return (
		<div>
			<div className={styles.heading}>
				<h1 className={styles.title}>
					Attendance & Leaves
				</h1>
				<Button
					size="md"
					themeType="primary"
					className={styles.request_btn}
					onClick={() => setShowInbox(true)}
				>
					My Requests
					{MANAGER ? <IcMLiveChat /> : <IcMLiveChat />}
				</Button>
			</div>
			{/* <div className={`${styles.modal_container} ${styles[show ? 'show' : 'hide']}`}>
				{show && <RequestModal show={show} onClose={onClose} />}
			</div> */}
			{ showInbox ? <LeaveRequest setShowInbox={setShowInbox} isManager={is_manager} /> : (
				<div className={styles.tab_container}>
					<Tabs
						activeTab={activeTab}
						themeType="secondary"
						onChange={setActiveTab}
					>
						<TabPanel name="attendance" title="Attendance">
							<div className={styles.tab_panel}>
								<AttendanceManagement
									data={data}
									loading={loading}
									coords={coords}
									refetch={refetch}
								/>
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
			)}
		</div>
	);
}

export default AttendanceLeaveDashboard;
