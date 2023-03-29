import styles from './style.module.css';

function PercentagePassed({ stats_data }) {
	const { pass_percentage = '', class_average } = stats_data || {};

	return (
		<div className={styles.container}>
			<div className={styles.circle}>
				<div className={styles.label}>
					Pass Percentage
				</div>
				<div className={styles.value}>
					{(pass_percentage || 0).toFixed(2)}
					%
				</div>
			</div>

			<div className={styles.label}>
				Class Average :
				{' '}
				<span className={styles.bold}>
					{(class_average || 0).toFixed(2)}

					%
				</span>
			</div>
		</div>
	);
}

export default PercentagePassed;
