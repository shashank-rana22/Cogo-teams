import styles from './styles.module.css';

function Percentile({ stats_data, hasPassed }) {
	return (
		<div className={styles.main_container}>
			<div className={styles.container} style={{ background: hasPassed ? '#f7faef' : '#fef3f1' }}>
				Percentile
				<div className={styles.percentile} style={{ color: hasPassed ? '#849e4c' : '#bf2a1e' }}>
					{stats_data.user_percentile?.toFixed(2)}
					{' '}
					%
				</div>
			</div>
		</div>
	);
}

export default Percentile;
