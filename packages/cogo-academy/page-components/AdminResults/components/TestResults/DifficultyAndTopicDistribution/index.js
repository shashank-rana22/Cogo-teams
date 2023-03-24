import { Toggle } from '@cogoport/components';

import styles from './styles.module.css';

function DifficultyAndTopicDistribution() {
	return (
		<div className={styles.container}>
			<Toggle name="a4" size="md" disabled={false} offLabel="Level of Difficulty" onLabel="Topic wise" />
		</div>
	);
}

export default DifficultyAndTopicDistribution;
