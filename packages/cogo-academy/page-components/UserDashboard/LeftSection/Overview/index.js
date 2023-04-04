import toFixed from '../../../CreateModule/utils/toFixed';

import styles from './styles.module.css';

function Overview({ data = {} }) {
	const { passed_count = 0, total_attempted = 0, total_no_tests = 0, avg_percentile } = data;

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Overview
			</div>

			<div className={styles.content_container}>
				<div className={styles.content}>
					<div className={styles.text}>Tests Given</div>
					<div className={styles.value}>
						{total_attempted}
						/
						{total_no_tests}
					</div>
				</div>

				<div className={styles.content}>
					<div className={styles.text}>Tests Cleared</div>
					<div className={styles.value}>
						{passed_count}
						/
						{total_attempted}
					</div>
				</div>

				<div className={styles.content}>
					<div className={styles.text}>Avg Percentile</div>
					<div className={styles.value}>
						{+toFixed(avg_percentile, 2)}
						{' '}
						%
					</div>
				</div>
			</div>
		</div>

	);
}

export default Overview;
