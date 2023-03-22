import styles from './styles.module.css';

function TopicWisePercentile({ topic_wise_percentile }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Topic wise percentile:</div>

			<div className={styles.topicwise_stats}>
				{Object.entries(topic_wise_percentile || {}).map(([key, value]) => (
					<div className={styles.percentile}>
						<div className={styles.topic}>{key}</div>

						<div className={styles.percentage}>
							{value.toFixed(2)}
							{' '}
							%
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default TopicWisePercentile;
