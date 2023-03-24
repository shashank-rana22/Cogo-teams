import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function StatsDisplay({ data = {} }) {
	const STATS_MAPPING = {
		answered: {
			key   : 'answered',
			title : 'answered',
		},
		not_answered: {
			key   : 'not_answered',
			title : 'not_answered',
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
	let total_count = 0;

	return (
		<div className={styles.stats_and_time}>
			<div className={styles.stats}>
				{Object.values(STATS_MAPPING).map((stats_data) => {
					const { title, key } = stats_data;
					const count = title === 'not_viewed'
						? data.total_questions - total_count
						: data?.data?.filter((item) => item.answer_state === title).length;

					total_count += Number(count);

					return (
						<div key={key} className={styles.content}>
							<div className={styles.label}>
								{startCase(title)}
							</div>
							<div className={styles.value}>
								:
								{' '}
								{count}
								/
								{data.total_questions}
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.stats}>
				<div className={styles.content}>
					<div className={styles.label}>
						Time Taken
					</div>
					<div className={styles.value}>
						: 59:45 min
					</div>
				</div>
			</div>

		</div>

	);
}

export default StatsDisplay;
