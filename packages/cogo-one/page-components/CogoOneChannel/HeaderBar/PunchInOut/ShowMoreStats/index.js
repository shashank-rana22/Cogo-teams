import { useSelector } from '@cogoport/store';

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
}) {
	const {
		profile: { user = {} },
	} = useSelector((state) => state);

	const { name = '', picture, email = '' } = user || {};

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
			<div className={styles.agent_stats_container}>
				<AgentStats
					setShowDetails={setShowDetails}
					showDetails={showDetails}
					name={name}
				/>
			</div>
		</>
	);
}

export default ShowMoreStats;
