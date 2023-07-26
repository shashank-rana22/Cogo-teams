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
	handleClick = () => {},
}) {
	const {
		profile: { user = {} },
	} = useSelector((state) => state);

	const { name = '', picture, email = '' } = user || {};

	return (
		<>
			<div className={styles.left_div}>
				<AgentInfo
					updateWorkPreference={updateWorkPreference}
					loading={loading}
					name={name}
					email={email}
					picture={picture}
					punchedTime={punchedTime}
					status={status}
					handleClick={handleClick}
				/>
			</div>
			<div className={styles.right_div}>
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
