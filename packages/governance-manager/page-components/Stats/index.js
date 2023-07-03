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
				<div className={styles.onboarded}> 1</div>
				<div className={styles.rejected}>2</div>
			</div>
		</div>
	);
}
export default Stats;
