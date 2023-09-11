import {
	// Toggle,
	Button,
} from '@cogoport/components';
import React, { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
import MailNotification from '../MailNotification';

import AgentStatus from './AgentStatus';
import LeaveStatus from './LeaveStatus';
// import styles from './styles.module.css';

function AgentSettings({
	viewType = '',
	agentStatus = {},
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
	// setIsBotSession = () => {},
	isBotSession = false,
	userId = '',
	firestore = {},
	preferenceLoading = false,
}) {
	const [showNotifications, setShowNotifications] = useState(false);
	return (
		<>
			{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.on_leave_status_toggle && (
				<LeaveStatus
					agentStatus={agentStatus}
					fetchworkPrefernce={fetchworkPrefernce}
					agentTimeline={agentTimeline}
					userId={userId}
					firestore={firestore}
					preferenceLoading={preferenceLoading}
				/>
			)}

			{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.toggle_self_status && (
				<AgentStatus
					agentStatus={agentStatus}
					fetchworkPrefernce={fetchworkPrefernce}
					agentTimeline={agentTimeline}
					userId={userId}
					firestore={firestore}
				/>
			)}
			<Button size="sm" onClick={() => setShowNotifications(true)}>Click</Button>

			{showNotifications && (
				<MailNotification
					setShowNotifications={setShowNotifications}
					firestore={firestore}
					isBotSession={isBotSession}
					viewType={viewType}
					agentId={userId}
				/>
			)}

			{/* {VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.bot_message_toggle && (
				<div className={styles.bot_messages}>
					<div>Bot Messages</div>
					<Toggle
						name="online"
						size="sm"
						onChange={() => setIsBotSession((prev) => !prev)}
						checked={isBotSession}
					/>
				</div>
			)} */}
		</>
	);
}

export default AgentSettings;
