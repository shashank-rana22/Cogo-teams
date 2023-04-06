import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const STATS_MAPPING = {
	answered: {
		key   : 'answered',
		title : 'answered',
	},
	viewed: {
		key   : 'viewed',
		title : 'viewed',
	},
	marked_for_review: {
		key   : 'marked_for_review',
		title : 'marked_for_review',
	},
	not_visited: {
		key   : 'not_viewed',
		title : 'not_viewed',
	},
};

function StatsDisplay({ data = [], total_question_count }) {
	let total_count = 0;

	return (
		<div className={styles.stats_and_time}>
			{Object.values(STATS_MAPPING).map((stats_data) => {
				const { title, key } = stats_data;

				const count = title === 'not_viewed'
					? total_question_count - total_count
					: data?.filter((item) => item.answer_state === title).length;

				total_count += Number(count);

				return (
					<div key={key} className={styles.content}>
						<div className={styles.label}>
							{startCase(title)}
							{' '}
							:
						</div>
						<div className={styles.value}>
							{count}
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
