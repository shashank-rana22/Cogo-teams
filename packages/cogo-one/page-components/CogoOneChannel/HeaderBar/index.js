import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';

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
			{isPunchPresent && !preferenceLoading && (
				<PunchInOut
					fetchworkPrefernce={fetchWorkStatus}
					agentStatus={agentStatus}
					data={data}
					agentTimeline={agentTimeline}
					preferenceLoading={preferenceLoading}
					timelineLoading={timelineLoading}
					viewType={viewType}
					timePeriodValue={timePeriodValue}
					setTimePeriodValue={setTimePeriodValue}
					firestore={firestore}
					userId={userId}
					isPunchPresent={isPunchPresent}
				/>
			)}
		</>
	);
}

export default HeaderBar;
