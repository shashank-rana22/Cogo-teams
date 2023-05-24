import OverallStats from './OverallStats';
import styles from './styles.module.css';
import UserStatistics from './UserStatistics';

function Dashboard() {
	return (
		<div className={styles.container}>
			<OverallStats />
			<UserStatistics />
		</div>
	);
}

export default Dashboard;
