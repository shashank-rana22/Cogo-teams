/* eslint-disable react/jsx-key */
import { Tabs, TabPanel } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import HeaderTitle from './HeaderTitle';
import LeaveCard from './LeaveCard';
import styles from './styles.module.css';

const data = {
	isManager : true,
	list      : [
		{
			request_type : 'Leave Request',
			pendingCount : 5,
			leaveData    : [
				{
					leaveType   : 'V sick',
					startDate   : '4 july',
					endDate     : '8 Aug',
					name        : 'Barath',
					appliedDate : '16 Aug',
					leaveStatus : 'pending',
				},
				{
					leaveType   : 'Sick',
					startDate   : '4 aug',
					endDate     : '8 Aug',
					name        : 'hritik',
					appliedDate : '16 Aug',
					leaveStatus : 'Approved',
				},
				{
					leaveType   : 'Sick',
					startDate   : '4 aug',
					endDate     : '8 Aug',
					name        : 'yash',
					appliedDate : '16 Aug',
					leaveStatus : 'Approved',
				},
			],
		},
		{
			request_type : 'Reimbursement Request',
			pendingCount : 5,
			leaveData    : [
				{
					leaveType   : 'Sick',
					startDate   : '4 aug',
					endDate     : '8 Aug',
					name        : 'hritik',
					appliedDate : '16 Aug',
					leaveStatus : 'pending',
				},
				{
					leaveType   : 'Sick',
					startDate   : '4 aug',
					endDate     : '8 Aug',
					name        : 'akshay',
					appliedDate : '16 Aug',
					leaveStatus : 'pending',
				},
				{
					leaveType   : 'Sick',
					startDate   : '4 aug',
					endDate     : '8 Aug',
					name        : 'yash',
					appliedDate : '16 Aug',
					leaveStatus : 'pending',
				},
			],
		},
	],
};

function RequestModal({ onClose }) {
	const [activeTab, setActiveTab] = useState('my_requests');
	const { isManager, list } = data;

	return (

		<>
			<div className={styles.header} onClick={onClose} aria-hidden>
				<HeaderTitle isManager={activeTab === 'my_requests' ? false : isManager} />
				<IcMCross />
			</div>
			{isManager && (
				<div className={styles.tab_switch}>
					<Tabs
						activeTab={activeTab}
						themeType="tertiary"
						onChange={setActiveTab}

					>
						<TabPanel name="employee_requests" title="Employee Requests" badge={3} />
						<TabPanel name="my_requests" title="My Requests" badge={5} />
					</Tabs>
				</div>
			)}
			{list.map((leaveData) => (
				<LeaveCard
					isManager={activeTab === 'my_requests' ? false : isManager}
					data={leaveData}
				/>
			))}
		</>
	);
}

export default RequestModal;
