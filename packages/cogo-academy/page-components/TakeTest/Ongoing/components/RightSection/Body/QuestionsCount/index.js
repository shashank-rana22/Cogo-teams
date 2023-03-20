import styles from './styles.module.css';

function QuestionsCount({ data = [] }) {
	const STATS_MAPPING = {
		answered          : '#DDEBC0',
		not_answered      : '#F8AEA8',
		marked_for_review : '#CED1ED',
		not_viewed        : '#FDFBF6',
	};
	return (
		<div className={styles.container}>
			{data?.data?.map((question, index) => (
				<div
					style={{ backgroundColor: STATS_MAPPING[question?.answer_state] }}
					className={styles.question_count}
				>
					{index + 1}

				</div>
			))}
		</div>
	);
}

export default QuestionsCount;
