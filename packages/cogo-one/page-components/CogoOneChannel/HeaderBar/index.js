import React from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';

import AgentStatusToggle from './AgentStatusToggle';
import AgentStatusView from './AgentStatusView';
import FlashRevertLogs from './FlashRevertLogs';
import PunchInOut from './PunchInOut';
import styles from './styles.module.css';

function HeaderBar({
	firestore = {},
	viewType = '',
	fetchWorkStatus = () => {},
	agentStatus = {},
	data = {},
	agentTimeline = () => {},
	preferenceLoading = false,
	timelineLoading = false,
}) {
	const {
		flash_revert_logs = false,
		toggle_agent_status = false,
		punch_in_out = false,
		team_agents_status_view = false,
	} = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions || {};

	return (
		<>
			<div className={styles.container}>
				{flash_revert_logs ? (
					<FlashRevertLogs />
				) : null}

				{team_agents_status_view ? (
					<AgentStatusView
						firestore={firestore}
					/>
				) : null}

				{toggle_agent_status ? (
					<AgentStatusToggle
						firestore={firestore}
					/>
				) : null}
			</div>

			{punch_in_out && (
				<PunchInOut
					fetchworkPrefernce={fetchWorkStatus}
					agentStatus={agentStatus}
					data={data}
					agentTimeline={agentTimeline}
					preferenceLoading={preferenceLoading}
					timelineLoading={timelineLoading}
				/>
			)}
		</>
	);
}

export default HeaderBar;
