import { isEmpty } from '@cogoport/utils';
import React from 'react';

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
		flash_revert_logs = false,
		punch_in_out = false,
	} = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions || {};

	const configurationsToBeShown = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.configurations_to_be_shown;

	return (
		<>
			<div className={styles.container}>
				{flash_revert_logs ? (
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

			{punch_in_out && (
				<PunchInOut
					fetchworkPrefernce={fetchWorkStatus}
					agentStatus={agentStatus}
					data={data}
					agentTimeline={agentTimeline}
					preferenceLoading={preferenceLoading}
					timelineLoading={timelineLoading}
					firestore={firestore}
					userId={userId}
				/>
			)}
		</>
	);
}

export default HeaderBar;
