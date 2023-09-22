import Activity from '../../../common/Activity';
import IncentiveSnapshot from '../../../common/IncentiveSnapshot';
import RankingAndScoring from '../../../common/RankingAndScoring';

import styles from './styles.module.css';

function RightPanel() {
	return (
		<div className={styles.container}>
			<div className={styles.entity_tag}>
				<div className={styles.badge} />

				<div>Cogo India</div>
			</div>

			<RankingAndScoring />

			<IncentiveSnapshot />

			<Activity />
		</div>
	);
}

export default RightPanel;
