import OverallStats from './OverallStats';
import styles from './styles.module.css';

function Dashboard() {
	return (
		<div className={styles.container}>
			<OverallStats />
		</div>
	);
}

export default Dashboard;
