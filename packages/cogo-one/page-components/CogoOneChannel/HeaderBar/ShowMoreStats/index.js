import { useSelector } from '@cogoport/store';

import useGetCogoOneAgentStats from '../../../../hooks/useGetOmniChannelStats';

import AgentInfo from './AgentInfo';
import AgentStats from './AgentStats';
import styles from './styles.module.css';

function ShowMoreStats({
	setShowDetails = () => {},
	showDetails = false,
	updateWorkPreference = () => {},
	loading = false,
	punchedTime = '',
	status = '',
	handlePunchIn = () => {},
	viewType = '',
	timePeriodValue = '',
	setTimePeriodValue = () => {},
	isPunchPresent = false,
}) {
	const {
		profile: { user = {} },
	} = useSelector((state) => state);

	const { name = '', picture, email = '' } = user || {};

	const {
		agentStatsLoading = false,
		agentStatsData = {},
	} = useGetCogoOneAgentStats({ isPunchPresent, timePeriodValue, viewType });

	return (
		<>
			<div className={styles.agent_info_container}>
				<AgentInfo
					updateWorkPreference={updateWorkPreference}
					loading={loading}
					name={name}
					email={email}
					picture={picture}
					punchedTime={punchedTime}
					status={status}
					handlePunchIn={handlePunchIn}
				/>
			</div>
			<AgentStats
				setShowDetails={setShowDetails}
				showDetails={showDetails}
				name={name}
				viewType={viewType}
				agentStatsLoading={agentStatsLoading}
				agentStatsData={agentStatsData}
				timePeriodValue={timePeriodValue}
				setTimePeriodValue={setTimePeriodValue}
			/>
		</>
	);
}

export default ShowMoreStats;
