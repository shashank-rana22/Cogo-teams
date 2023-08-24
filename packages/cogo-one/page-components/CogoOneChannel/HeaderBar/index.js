import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';

import AgentConfig from './AgentConfig';
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
	initialViewType = '',
	setViewType = () => {},
}) {
	const {
		flash_revert_logs : flashRevertLogs = false,
		punch_in_out : isPunchPresent = false,
	} = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions || {};

	const [timePeriodValue, setTimePeriodValue] = useState('day');
	const [showDetails, setShowDetails] = useState(false);

	const configurationsToBeShown = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.configurations_to_be_shown;

	return (
		<>
			<div className={styles.container}>
				<div className={styles.label_styles}>
					{startCase(viewType)}
					{' '}
					View
				</div>

				<div>
					{flashRevertLogs ? (
						<FlashRevertLogs showDetails={showDetails} />
					) : null}

					{!isEmpty(configurationsToBeShown) && (
						<AgentConfig
							firestore={firestore}
							configurationsToBeShown={configurationsToBeShown}
							setViewType={setViewType}
							initialViewType={initialViewType}
							viewType={viewType}
							showDetails={showDetails}
						/>
					)}
				</div>
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
					showDetails={showDetails}
					setShowDetails={setShowDetails}
				/>
			)}
		</>
	);
}

export default HeaderBar;
