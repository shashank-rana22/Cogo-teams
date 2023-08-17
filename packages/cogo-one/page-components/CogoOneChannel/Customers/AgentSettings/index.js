import { Toggle } from '@cogoport/components';
import React from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';

import AgentStatus from './AgentStatus';
import LeaveStatus from './LeaveStatus';
import styles from './styles.module.css';

function AgentSettings({
	viewType = '',
	agentStatus = {},
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
	setIsBotSession = () => {},
	isBotSession = false,
	userId = '',
	firestore = {},
}) {
	return (
		<>
			{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.on_leave_status_toggle && (
				<LeaveStatus
					agentStatus={agentStatus}
					fetchworkPrefernce={fetchworkPrefernce}
					agentTimeline={agentTimeline}
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

			{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.bot_message_toggle && (
				<div className={styles.bot_messages}>
					<div>Bot Messages</div>
					<Toggle
						name="online"
						size="sm"
						onChange={() => setIsBotSession((prev) => !prev)}
						checked={isBotSession}
					/>
				</div>
			)}
		</>
	);
}

export default AgentSettings;
