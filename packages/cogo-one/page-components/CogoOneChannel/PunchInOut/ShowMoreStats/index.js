import { useSelector } from '@cogoport/store';

import AgentInfo from './AgentInfo';
import AgentStats from './AgentStats';
import styles from './styles.module.css';

function ShowMoreStats({
	userId = '',
	setShowDetails = () => {},
	showDetails = false,
	updateWorkPreference = () => {},
	data = {},
	loading = false,
	// firestore,
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
					data={data}
					loading={loading}
					name={name}
					email={email}
					picture={picture}
				/>
			</div>
			<div className={styles.right_div}>
				<AgentStats
					userId={userId}
					setShowDetails={setShowDetails}
					showDetails={showDetails}
					name={name}
					// firestore={firestore}
				/>
			</div>
		</>
	);
}

export default ShowMoreStats;
