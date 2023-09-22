import Activity from '../../../common/Activity';
import IncentiveSnapshot from '../../../common/IncentiveSnapshot';
import RankingAndScoring from '../../../common/RankingAndScoring';

import styles from './styles.module.css';

function RightPanel() {
	return (
		<div className={styles.container}>
			<RankingAndScoring />

			<IncentiveSnapshot />

			<Activity />
		</div>
	);
}

export default RightPanel;
