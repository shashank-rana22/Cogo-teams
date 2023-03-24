import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function QuestionsCount({ data = {}, setCurrentQuestion, fetchQuestions }) {
	const {
		profile: {
			user: { id: user_id },
		},
		general: {
			query: { test_id },
		},
	} = useSelector((state) => state);
	const STATS_MAPPING = {
		answered          : '#DDEBC0',
		not_answered      : '#F8AEA8',
		marked_for_review : '#CED1ED',
		not_viewed        : '#FDFBF6',
	};

	const handleChangeQuestion = ({ index }) => {
		if (index === 0 || data?.data?.[index - 1].answer_state !== 'not_viewed') {
			localStorage.setItem(`current_question_${test_id}_${user_id}`, index + 1);
			setCurrentQuestion(index + 1);
		}

		fetchQuestions({ currentQ: index + 1 });
	};

	const len = (data.total_questions - data.data.length);
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
			{ len ? [...Array(len)].map((item, index) => (
				<div
					role="presentation"
					style={{ backgroundColor: '#FDFBF6', cursor: 'not-allowed' }}
					className={styles.question_count}
				>
					{data.data.length + index + 1}
				</div>
			)) : null}

		</div>
	);
}

export default QuestionsCount;
