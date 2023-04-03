import styles from './styles.module.css';

const STATS_MAPPING = {
	answered: {
		key   : 'answered',
		label : 'Answered',
		color : '#DDEBC0',
	},
	viewed: {
		key   : 'viewed',
		label : 'Not Answered',
		color : '#F8AEA8',
	},
	marked_for_review: {
		key   : 'marked_for_review',
		label : 'Marked for Review',
		color : '#CED1ED',
	},
	not_viewed: {
		key   : 'not_viewed',
		label : 'Not Viewed',
		color : '#FDFBF6',
	},
};

function QuestionStats({ total_question_count, user_appearance = [] }) {
	let total_count = 0;

	return (
		<div className={styles.container}>
			{Object.values(STATS_MAPPING).map((stats) => {
				const { label, color, key } = stats;

				const count = key === 'not_viewed'
					? total_question_count - total_count
					: user_appearance?.filter((item) => item.answer_state === key).length;

				total_count += Number(count);

				return (
					<div key={key} className={styles.stats_container}>
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
