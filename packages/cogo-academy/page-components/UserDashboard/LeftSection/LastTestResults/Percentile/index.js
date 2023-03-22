import styles from './styles.module.css';

function Percentile({ stats_data }) {
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				Percentile
				<div className={styles.percentile}>
					{stats_data.user_percentile.toFixed(2)}
					{' '}
					%
				</div>
			</div>
		</div>
	);
}

export default Percentile;
