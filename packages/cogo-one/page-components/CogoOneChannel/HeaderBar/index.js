import React, { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';
import useGetCogoOneAgentStats from '../../../hooks/useGetOmniChannelStats';

import AgentStatusToggle from './AgentStatusToggle';
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
	} = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions || {};

	const [timePeriodValue, setTimePeriodValue] = useState('day');

	const isPunchPresent = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.punch_in_out;

	/// function call
	const {
		AgentStatsLoading = false,
		AgentStatsData = {},
	} = useGetCogoOneAgentStats({ isPunchPresent, timePeriodValue });

	return (
		<>
			<div className={styles.container}>
				{flash_revert_logs ? (
					<FlashRevertLogs />
				) : null}
				{toggle_agent_status ? (
					<AgentStatusToggle
						firestore={firestore}
					/>
				) : null}
			</div>
			{isPunchPresent && (
				<PunchInOut
					fetchworkPrefernce={fetchWorkStatus}
					agentStatus={agentStatus}
					data={data}
					agentTimeline={agentTimeline}
					preferenceLoading={preferenceLoading}
					timelineLoading={timelineLoading}
					viewType={viewType}
					// getCogoOneDashboard={getCogoOneDashboard}
					AgentStatsLoading={AgentStatsLoading}
					AgentStatsData={AgentStatsData}
					timePeriodValue={timePeriodValue}
					setTimePeriodValue={setTimePeriodValue}
				/>
			)}
		</>
	);
}

export default HeaderBar;
