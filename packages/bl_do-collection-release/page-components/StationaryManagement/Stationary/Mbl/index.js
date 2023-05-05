import styles from './styles.module.css';

function Mbl() {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>MBL</h3>
			<div className={styles.divider} />

			<div className={styles.stats}>
				<div className={styles.stats_sub_container}>
					<div>Copies</div>
					<div className={styles.value}>1</div>
				</div>

				<div className={styles.stats_sub_container}>
					<div>Organizations</div>
					<div className={styles.value}>1</div>
				</div>
			</div>
		</div>
	);
}

export default Mbl;
