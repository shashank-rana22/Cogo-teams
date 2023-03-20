import styles from './styles.module.css';

const STATS_MAPPING = {
	answered: {
		key   : 'answered',
		count : 0,
		label : 'Answered',
		color : '#DDEBC0',
	},
	not_answered: {
		key   : 'not_answered',
		count : 0,
		label : 'Not Answered',
		color : '#F8AEA8',
	},
	marked_for_review: {
		key   : 'marked_for_review',
		count : 0,
		label : 'Marked for Review',
		color : '#CED1ED',
	},
	not_viewed: {
		key   : 'not_viewed',
		count : 24,
		label : 'Not Viewed',
		color : '#FDFBF6',
	},
};

function QuestionStats({ data = [] }) {
	// console.log('asdfghj', data);

	return (
		<div className={styles.container}>
			{Object.values(STATS_MAPPING).map((stats) => {
				const { count, label, color } = stats;

				return (
					<div className={styles.stats_container}>
						<div style={{ backgroundColor: color }} className={styles.stats_count}>
							{count}
						</div>
						<p className={styles.label}>{label}</p>
					</div>
				);
			})}
		</div>
	);
}

export default QuestionStats;
