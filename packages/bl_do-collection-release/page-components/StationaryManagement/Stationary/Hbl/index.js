import styles from './styles.module.css';

function Hbl() {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>HBL</h3>
			<div className={styles.divider} />

			<div className={styles.stats}>
				<div className={styles.stats_sub_container}>
					<div>Copies</div>
					<div className={styles.value}>1</div>
				</div>

				<div className={styles.stats_sub_container}>
					<div>Serial No. Start</div>
					<div className={styles.value}>1</div>
				</div>

				<div className={styles.stats_sub_container}>
					<div>Serial No. End</div>
					<div className={styles.value}>1</div>
				</div>
			</div>
		</div>
	);
}

export default Hbl;
