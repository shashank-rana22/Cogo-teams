import styles from './styles.module.css';

function Stats() {
	return (
		<div className={styles.stats}>
			<div className={styles.pending}>
				<div className={styles.pending_left}>
					<div className={styles.circle}>
						ifnners
					</div>
				</div>
				<div className={styles.pending_right}>
					<div>180</div>
					<div>Suppliers Pending</div>

				</div>
			</div>
			<div className={styles.onboarded_rejected}>
				<div className={styles.onboarded}>
					<div className={styles.onboarded_left}>
						<div className={styles.circle}>
							ifnners
						</div>
					</div>
					<div className={styles.onboarded_right}>
						<div>640</div>
						<div>Suppliers Onboarded</div>
					</div>
				</div>
				<div className={styles.rejected}>
					<div className={styles.rejected_left}>
						<div className={styles.circle}>
							ifnners
						</div>
					</div>
					<div className={styles.rejected_right}>
						<div>640</div>
						<div>Suppliers Rejected</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Stats;
