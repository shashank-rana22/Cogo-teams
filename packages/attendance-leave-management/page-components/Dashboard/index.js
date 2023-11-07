import { Tabs, TabPanel, Button, Toast, Breadcrumb } from '@cogoport/components';
import { IcMLiveChat } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
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
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('attendance');
	const { query } = useSelector((state) => state.general);
	const [showInbox, setShowInbox] = useState(query?.showInbox || false);

	const [coords, setCoords] = useState(null);
	const handleShowInbox = () => {
		setShowInbox(true);
		router.push('/attendance-leave-management?showInbox=true');
	};

	useEffect(() => {
		getCurrentLocation()
			.then((location) => {
				setCoords(location);
			})
			.catch((error) => {
				console.error('Error getting location:', error);
				Toast.error('Please Enable Location');
			});
	}, []);

	const { data, loading, refetch } = useGetCheckinStats(coords);

	const { is_manager, is_policy_view_allowed } = data || {};

	return (
		<div>
			<Breadcrumb className={styles.bread}>
				<Breadcrumb.Item label={(
					<div
						aria-hidden
						onClick={() => router.push('/welcome')}
						style={{ cursor: 'pointer' }}
					>
						HRMS
					</div>
				)}
				/>
				<Breadcrumb.Item label="Attendance & Leaves Management" />
			</Breadcrumb>
			<div className={styles.heading}>
				<h1 className={styles.title}>
					Attendance & Leaves
				</h1>
				{!showInbox ? (
					<Button
						size="md"
						themeType="primary"
						className={styles.request_btn}
						onClick={handleShowInbox}
					>
						My Requests
						{MANAGER ? <IcMLiveChat /> : <IcMLiveChat />}
					</Button>
				) : null}
			</div>
			{ showInbox ? <LeaveRequest isManager={is_manager} setShowInbox={setShowInbox} /> : (
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

						{is_policy_view_allowed ? (
							<TabPanel name="policies" title="Policies">
								<div className={styles.tab_panel}>
									<Policies />
								</div>
							</TabPanel>
						) : null}

						{is_manager ? (
							<TabPanel name="my_team" title="My Team">
								<div className={styles.tab_panel}>
									<TeamAttendance />
								</div>
							</TabPanel>
						) : null}
					</Tabs>
				</div>
			)}
		</div>
	);
}

export default AttendanceLeaveDashboard;
