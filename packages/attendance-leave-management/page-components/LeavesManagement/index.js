import Header from './Header';
import LeaveBalancesComponent from './LeaveBalancesComponent';
import LeaveStatsApplicationsComponent from './LeaveStatsApplicationsComponent';
import styles from './styles.module.css';

function LeavesManagement() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header />
			</div>
			<div className={styles.body_container}>
				<div className={styles.leave_balance_style}>
					<LeaveBalancesComponent />
				</div>
				<div className={styles.leave_stats_style}>
					<LeaveStatsApplicationsComponent />
				</div>
			</div>
		</div>
	);
}

export default LeavesManagement;
