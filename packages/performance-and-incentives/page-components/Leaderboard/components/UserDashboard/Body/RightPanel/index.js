import Activity from '../../../../common/Activity';
import IncentiveSnapshot from '../../../../common/IncentiveSnapshot';

import styles from './styles.module.css';

function RightPanel() {
	return (
		<div className={styles.container}>
			<IncentiveSnapshot />

			<Activity />
		</div>
	);
}

export default RightPanel;
