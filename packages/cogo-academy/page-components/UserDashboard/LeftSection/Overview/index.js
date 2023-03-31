import toFixed from '../../../CreateModule/utils/toFixed';

import styles from './styles.module.css';

function Overview({ data = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Overview
			</div>

			<div className={styles.content_container}>
				<div className={styles.content}>
					<div className={styles.text}>Tests Given</div>
					<div className={styles.value}>
						{data?.total_attempted || 0}
						/
						{data?.total_no_tests || 0}
					</div>
				</div>

				<div className={styles.content}>
					<div className={styles.text}>Tests Cleared</div>
					<div className={styles.value}>
						{data?.passed_count || 0}
						/
						{data?.total_attempted || 0}
					</div>
				</div>

				<div className={styles.content}>
					<div className={styles.text}>Avg Percentile</div>
					<div className={styles.value}>
						{+toFixed(data?.avg_percentile, 2)}
						{' '}
						%
					</div>
				</div>
			</div>
		</div>

	);
}

export default Overview;
