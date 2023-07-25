import AgentInfo from './AgentInfo';
import AgentStats from './AgentStats';
import styles from './styles.module.css';

function ShowMoreStats() {
	return (
		<>
			<div className={styles.left_div}>
				<AgentInfo />
			</div>
			<div className={styles.right_div}>
				<AgentStats />
			</div>
		</>
	);
}

export default ShowMoreStats;
