import styles from './styles.module.css';

function QuestionsCount({ data = {}, setCurrentQuestion }) {
	const STATS_MAPPING = {
		answered          : '#DDEBC0',
		not_answered      : '#F8AEA8',
		marked_for_review : '#CED1ED',
		not_viewed        : '#FDFBF6',
	};

	// console.log('asdfghjcxdfg:', data);
	const handleChangeQuestion = ({ index }) => {
		if (index === 0 || data?.data?.[index - 1].answer_state !== 'not_viewed') {
			setCurrentQuestion(index + 1);
		}
	};

	return (
		<div className={styles.container}>
			{data?.data?.map((question, index) => {
				const { answer_state = '' } = question || {};

				return (
					<div
						role="presentation"
						onClick={() => handleChangeQuestion({ index })}
						style={{
							backgroundColor : STATS_MAPPING[answer_state],
							cursor          : `${(index === 0 || data?.data?.[index - 1].answer_state !== 'not_viewed')
								? 'pointer' : 'not-allowed'}`,
						}}
						className={styles.question_count}
					>
						{index + 1}

					</div>

				);
			})}
		</div>
	);
}

export default QuestionsCount;
