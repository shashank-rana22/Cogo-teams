import { Select, Input, Tabs, TabPanel } from '@cogoport/components';
import { IcMArrowLeft, IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

import LeaveCard from '../RequestModal/LeaveCard';

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
					leaveStatus : 'Pending',
					reason      : 'Reason for leaving',
					timestamp   : '2023-08-29T16:56:00',
				},
				{
					leaveType   : 'Sick',
					startDate   : '4 aug',
					endDate     : '8 Aug',
					name        : 'hritik',
					appliedDate : '16 Aug',
					leaveStatus : 'Approved',
					reason      : 'Reason for leaving',
					timestamp   : '2023-08-29T16:56:00',
				},
				{
					leaveType   : 'Sick',
					startDate   : '4 aug',
					endDate     : '8 Aug',
					name        : 'yash',
					appliedDate : '16 Aug',
					leaveStatus : 'Pending',
					reason      : 'Reason for leaving',
					timestamp   : '2023-08-29T16:56:00',
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
					leaveStatus : 'Pending',
					reason      : 'Reason for leaving',
					timestamp   : '2023-08-28T12:00:00',
				},
				{
					leaveType   : 'Sick',
					startDate   : '4 aug',
					endDate     : '8 Aug',
					name        : 'akshay',
					appliedDate : '16 Aug',
					leaveStatus : 'Pending',
					reason      : 'Reason for leaving',
					timestamp   : '2023-08-28T12:00:00',
				},
				{
					leaveType   : 'Sick',
					startDate   : '4 aug',
					endDate     : '8 Aug',
					name        : 'yash',
					appliedDate : '16 Aug',
					leaveStatus : 'Pending',
					reason      : 'Reason for leaving',
					timestamp   : '2023-08-28T12:00:00',
				},
			],
		},
	],
};

function LeaveRequest({ setShowInbox }) {
	const { isManager, list } = data;
	const [activeTab, setActiveTab] = useState('my_requests');
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left_header}>
					<IcMArrowLeft width={20} height={20} onClick={() => setShowInbox(false)} />
					<div className={styles.card_content}>
						<span className={styles.above_text}>INBOX</span>
						<span className={styles.below_text}>
							View and manage all requests
						</span>
					</div>
				</div>
			</div>
			<div className={styles.filters}>
				<div className={styles.tab_switch}>
					<Tabs
						activeTab={activeTab}
						themeType="tertiary"
						onChange={setActiveTab}
					>
						<TabPanel
							name="employee_requests"
							title="Employee Requests"
							badge={3}
						/>
						<TabPanel name="my_requests" title="My Requests" badge={5} />
					</Tabs>
				</div>
				<div className={styles.selection_options}>
					<div className={styles.select}>
						<Select placeholder="Request Type" />
					</div>
					<Input size="md" prefix={<IcMSearchdark />} placeholder="Search" />
				</div>
			</div>
			{/* <div className={styles.card_container} onClick={() => setAccordion(!accordion)}>
				<div className={styles.card_content}>
					<span className={styles.above_text}>LEAVE REQUESTS</span>
					<span className={styles.below_text}>2 Pending</span>
				</div>
				<div className={styles.selection_options}>
					<Button themeType="secondary">Approve All</Button>
					<div>
						{accordion
							? <IcMArrowUp width={16} height={16} /> : <IcMArrowDown width={16} height={16} />}

					</div>

				</div>
			</div> */}
			{/* <div className={styles.card_container} onClick={() => setAccordion(!accordion)}>
				<div className={styles.card_content}>
					<span className={styles.above_text}>GEOLOCATION REQUESTS</span>
					<span className={styles.below_text}>2 Pending</span>
				</div>
				<div className={styles.selection_options}>
					<Button themeType="secondary">Approve All</Button>
					<div>
						{' '}
						{accordion
							? <IcMArrowUp width={16} height={16} /> : <IcMArrowDown width={16} height={16} />}
					</div>
				</div>

			</div> */}
			{list.map((leaveData) => (
				<LeaveCard
					isManager={activeTab === 'my_requests' ? false : isManager}
					data={leaveData}
					key={data.index}
				/>
			))}
		</div>
	);
}

export default LeaveRequest;
