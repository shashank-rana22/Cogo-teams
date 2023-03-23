import styles from './styles.module.css';

function ListHeader() {
	return (
		<div className={styles.container}>
			<div className={styles.small_section}>
				TOPIC
			</div>

			<div className={styles.section}>
				QUESTION
			</div>

			<div className={styles.small_section}>
				QUESTION TYPE
			</div>

			<div className={styles.small_section}>
				DIFFICULTY LEVEL
			</div>

			<div className={styles.small_section}>
				STUDENTS IT APPEARED FOR
			</div>

			<div className={styles.small_section}>
				CORRECT PERCENTAGE
			</div>

			<div className={styles.icon} />
		</div>
	);
}

export default ListHeader;
