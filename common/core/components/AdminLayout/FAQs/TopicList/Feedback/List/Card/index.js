import styles from './styles.module.css';

function Card() {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.basic_info}>
					<div className={styles.feedback_number}>#123</div>
					<div className={styles.file}>file</div>
				</div>

				<div className={styles.category}>category</div>
				<div className={styles.issue_type}>issue_type</div>
			</div>

			<div className={styles.desc_info}>
				<div className={styles.date}>date</div>
				<div className={styles.desc}>desc</div>
			</div>
		</div>
	);
}

export default Card;
