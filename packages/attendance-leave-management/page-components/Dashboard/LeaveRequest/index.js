import { Input, Tabs, TabPanel } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowLeft, IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetLeaveGroupings from '../../../hooks/useGetLeaveGroupings';

import LeaveCard from './LeaveCard';
import styles from './styles.module.css';

function LeaveRequest({ setShowInbox, isManager }) {
	const [activeTab, setActiveTab] = useState('employee');

	const { data } = useGetLeaveGroupings(activeTab);

	const { total_self_pending_count, list, total_employees_pending_count } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left_header}>
					<IcMArrowLeft width={20} height={20} onClick={() => setShowInbox(false)} />
					<div className={styles.card_content}>
						<span className={styles.above_text}>MY INBOX</span>
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
							name="employee"
							title="My Requests"
							badge={total_self_pending_count || GLOBAL_CONSTANTS.zeroth_index}
						/>
						{isManager && (
							<TabPanel
								name="manager"
								title="Employee Requests"
								badge={total_employees_pending_count || GLOBAL_CONSTANTS.zeroth_index}
							/>
						)}
					</Tabs>
				</div>
				<div className={styles.selection_options}>
					<Input size="md" prefix={<IcMSearchdark />} placeholder="Search" />
				</div>
			</div>
			{(list || []).map((leaveData) => (
				<LeaveCard
					isManager={activeTab === 'manager'}
					data={leaveData}
					activeTab={activeTab}
					key={leaveData.leave_request}
				/>
			))}
		</div>
	);
}

export default LeaveRequest;
