import styles from './styles.module.css';

function Percentile({ stats_data }) {
	return (
		<div className={styles.container}>
			Percentile
			<div className={styles.percentile}>
				{stats_data.user_percentile}
				{' '}
				%
			</div>
		</div>
	);
}

export default Percentile;
