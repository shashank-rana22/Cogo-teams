import { Tooltip } from '@cogoport/components';

import toFixed from '../../../../CreateModule/utils/toFixed';

import styles from './styles.module.css';

const renderTooltip = ({ topic_wise_percentile }) => (
	Object.entries(topic_wise_percentile || {}).map(([key, value], index) => {
		if (index >= 2) {
			return (
				<div className={styles.Tooltip_row}>
					<div>{key}</div>
					<div className={styles.Tooltip_percentage}>
						<strong>
							{' '}
							{toFixed(value, 2)}
							{' '}
							%
						</strong>
					</div>
				</div>
			);
		}
		return null;
	})
);

function TopicWisePercentile({ topic_wise_percentile }) {
	const number_of_topics = Object.keys(topic_wise_percentile).length;
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Topic wise percentile:</div>

			<div className={styles.topicwise_stats}>
				{Object.entries(topic_wise_percentile || {}).map(
					([key, value], index) => {
						if (index < 2) {
							return (
								<div key={key} className={styles.percentile}>
									<div className={styles.topic}>{key}</div>
									<div className={styles.percentage}>
										{toFixed(value, 2)}
										{' '}
										%
									</div>
								</div>
							);
						}
						return (null);
					},
				)}
				{
					number_of_topics > 2 && (
						<Tooltip content={renderTooltip()} placement="bottom">
							<div className={styles.percentile_01}>
								<div className={styles.topic}>
									+
									{' '}
									{number_of_topics - 2}
								</div>
							</div>
						</Tooltip>

					)
				}
			</div>
		</div>
	);
}

export default TopicWisePercentile;
