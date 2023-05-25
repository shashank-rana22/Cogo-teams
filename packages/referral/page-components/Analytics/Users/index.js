import NetworkList from './NetworkList';
import PerformanceStats from './PerformaceStats';
import styles from './styles.module.css';
import UserList from './UsersList';

function UserPerformance() {
	return (
		<div>
			<PerformanceStats />
			<div className={styles.list_div}>
				<NetworkList />
				<UserList />
			</div>
		</div>
	);
}

export default UserPerformance;
