import styles from './styles.module.css';

function PreviousReminder() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Previous Reminders</div>
			<div className={styles.content}>
				<div className={styles.top}>
					<div className={styles.purpose}>Customer Req</div>
					<div className={styles.time}>25 Oct</div>
				</div>
				<div className={styles.top}>
					<div className={styles.task}>Call to ask details</div>
					<div className={styles.time}>5:00pm</div>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.top}>
					<div className={styles.purpose}>Customer Req</div>
					<div className={styles.time}>25 Oct</div>
				</div>
				<div className={styles.top}>
					<div className={styles.task}>Call to ask details</div>
					<div className={styles.time}>5:00pm</div>
				</div>
			</div>
		</div>

	);
}
export default PreviousReminder;
