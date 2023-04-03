import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

const STATS_MAPPING = {
	answered          : '#DDEBC0',
	viewed            : '#F8AEA8',
	marked_for_review : '#CED1ED',
	not_viewed        : '#FDFBF6',
};

function QuestionsCount({
	data = {},
	setCurrentQuestion,
	fetchQuestions,
	total_question_count,
	user_appearance = [],
	setSubQuestion,
}) {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const handleChangeQuestion = ({ index }) => {
		if (index === 0 || data?.data?.[index - 1].answer_state !== 'not_viewed') {
			localStorage.setItem(`current_question_${test_id}_${user_id}`, index + 1);
			setCurrentQuestion(index + 1);
		}

		setSubQuestion(1);

		fetchQuestions({ question_id: user_appearance?.[index]?.test_question_id });
	};

	const len = (total_question_count - user_appearance.length);

	return (
		<div className={styles.container}>
			{user_appearance?.map((question, index) => {
				const { answer_state = '', test_question_id } = question || {};

				return (
					<div
						key={test_question_id}
						role="presentation"
						onClick={() => handleChangeQuestion({ index })}
						style={{
							backgroundColor : STATS_MAPPING[answer_state],
							cursor          : `${(index === 0 || question?.answer_state !== 'not_viewed')
								? 'pointer' : 'not-allowed'}`,
						}}
						className={styles.question_count}
					>
						{index + 1}
					</div>
				);
			})}

			{len ? [...Array(len)].map((item, index) => (
				<div
					role="presentation"
					style={{ backgroundColor: '#FDFBF6', cursor: 'not-allowed' }}
					className={styles.question_count}
				>
					{user_appearance.length + index + 1}
				</div>
			)) : null}
		</div>
	);
}

export default QuestionsCount;
