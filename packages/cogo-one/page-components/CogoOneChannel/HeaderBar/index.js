import { cl } from '@cogoport/components';
import { IcMComment, IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';
import FeedbackModal from '../FeedbackModal';

import AgentConfig from './AgentConfig';
import FlashRevertLogs from './FlashRevertLogs';
import PunchInOut from './punchInOut';
import ShowMoreStats from './ShowMoreStats';
import styles from './styles.module.css';
import usePunchInOut from './usePunchInOut';

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

	const [activeCard, setActiveCard] = useState('');
	const [showFeedback, setShowFeedback] = useState(false);
	const [timePeriodValue, setTimePeriodValue] = useState('day');
	const [showDetails, setShowDetails] = useState(false);

	const {
		updateWorkPreference,
		loading,
		lastBreakTime,
		status,
		handlePunchIn,
		setIsShaking,
		shakeButton,
		handlePunchOut,
		isShaking,
	} = usePunchInOut({
		fetchworkPrefernce: fetchWorkStatus,
		agentTimeline,
		firestore,
		userId,
		agentStatus,
		data,
	});

	const configurationsToBeShown = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.configurations_to_be_shown;

	const showStats = !isEmpty(VIEW_TYPE_GLOBAL_MAPPING[viewType]?.stats_feedback_count)
	|| VIEW_TYPE_GLOBAL_MAPPING[viewType]?.to_show_agent_activity_graph;

	return (
		<>
			<div className={cl`${styles.header_container} ${showDetails ? styles.show_on_top : ''}`}>
				<div className={cl`${styles.hide_stats_section} ${showDetails ? styles.show_stats_section : ''}`}>
					{(showDetails && showStats) ? (
						<ShowMoreStats
							setShowDetails={setShowDetails}
							showDetails={showDetails}
							updateWorkPreference={updateWorkPreference}
							loading={loading}
							punchedTime={lastBreakTime}
							status={status}
							handlePunchIn={handlePunchIn}
							viewType={viewType}
							timePeriodValue={timePeriodValue}
							setTimePeriodValue={setTimePeriodValue}
							isPunchPresent={isPunchPresent}
						/>
					) : null}
				</div>

				<div
					className={styles.navigation_bar}
					style={{ justifyContent: showDetails ? 'center' : 'space-between' }}
				>
					<div className={styles.label_styles}>
						{(showDetails || initialViewType !== 'cogoone_admin')
							? null
							: (
								<div
									role="presentation"
									className={styles.navigation_bar}
									onClick={() => setActiveCard('switch_views')}
								>
									<IcMEyeopen className={styles.eye_icon} />
									{`${startCase(viewType)} View`}
								</div>
							)}
					</div>

					{(isPunchPresent && !preferenceLoading) ? (
						<PunchInOut
							timelineLoading={timelineLoading}
							preferenceLoading={preferenceLoading}
							showDetails={showDetails}
							setShowDetails={setShowDetails}
							showStats={showStats}
							status={status}
							setIsShaking={setIsShaking}
							shakeButton={shakeButton}
							handlePunchIn={handlePunchIn}
							handlePunchOut={handlePunchOut}
							loading={loading}
							isShaking={isShaking}
							lastBreakTime={lastBreakTime}
						/>
					) : null}

					<div className={cl`${styles.configs} ${showDetails ? styles.hide_section : ''}`}>
						{flashRevertLogs ? (
							<FlashRevertLogs />
						) : null}

						{(!isEmpty(configurationsToBeShown) || initialViewType === 'cogoone_admin') ? (
							<AgentConfig
								firestore={firestore}
								configurationsToBeShown={configurationsToBeShown}
								setViewType={setViewType}
								initialViewType={initialViewType}
								viewType={viewType}
								showDetails={showDetails}
								activeCard={activeCard}
								setActiveCard={setActiveCard}
							/>
						) : null}
					</div>
				</div>
			</div>
			{!showFeedback && (
				<div
					role="presentation"
					className={styles.feedback}
					onClick={() => setShowFeedback(((prev) => !prev))}
				>
					<span className={styles.feedback_icon}>
						<IcMComment />
					</span>
					<span className={styles.feedback_label}>
						Feedback
					</span>
				</div>
			)}
			{showFeedback && (
				<FeedbackModal
					showFeedback={showFeedback}
					setShowFeedback={setShowFeedback}
				/>
			)}
		</>

	);
}

export default HeaderBar;
