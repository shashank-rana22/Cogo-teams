import { isEmpty } from '@cogoport/utils';
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
	userId = '',
}) {
	const {
		flash_revert_logs : flashRevertLogs = false,
		punch_in_out : isPunchPresent = false,
	} = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions || {};

	const [timePeriodValue, setTimePeriodValue] = useState('day');

	const {
		AgentStatsLoading = false,
		AgentStatsData = {},
	} = useGetCogoOneAgentStats({ isPunchPresent, timePeriodValue, viewType });
	const configurationsToBeShown = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.configurations_to_be_shown;

	return (
		<>
			<div className={styles.container}>
				{flashRevertLogs ? (
					<FlashRevertLogs />
				) : null}

				{!isEmpty(configurationsToBeShown) && (
					<AgentStatusToggle
						firestore={firestore}
						configurationsToBeShown={configurationsToBeShown}
						viewType={viewType}
					/>
				)}
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
					AgentStatsLoading={AgentStatsLoading}
					AgentStatsData={AgentStatsData}
					timePeriodValue={timePeriodValue}
					setTimePeriodValue={setTimePeriodValue}
					firestore={firestore}
					userId={userId}
				/>
			)}
		</>
	);
}

export default HeaderBar;
