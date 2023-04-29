import React from 'react';

import styles from './styles.module.css';

const STATS_MAPPING = {
	answered: {
		key   : 'answered',
		title : 'Answered',
	},
	marked_for_review: {
		key   : 'marked_for_review',
		title : 'Marked for review',
	},
	visited: {
		key   : 'visited',
		title : 'Visited',
	},
	not_visited: {
		key   : 'not_visited',
		title : 'Not Visited',
	},
};

function StatsDisplay({ data = [], total_question_count }) {
	return (
		<div className={styles.stats_and_time}>
			{Object.values(STATS_MAPPING).map((stats_data) => {
				const { title, key } = stats_data;

				const DATA_MAPPING = {
					answered          : data.filter((item) => item.answer_state === key).length,
					marked_for_review : data.filter((item) => item.answer_state === key).length,
					visited           : data.length,
					not_visited       : total_question_count - data.length,
				};

				return (
					<div key={key} className={styles.content}>
						<div className={styles.label}>
							{title}
							{' '}
							:
						</div>
						<div className={styles.value}>
							{DATA_MAPPING[key]}
							/
							{total_question_count}
						</div>
					</div>
				);
			})}
		</div>

	);
}

export default StatsDisplay;
