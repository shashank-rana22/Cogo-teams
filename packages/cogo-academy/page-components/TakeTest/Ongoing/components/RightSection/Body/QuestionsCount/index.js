import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useContext } from 'react';

import { QuestionStatsContext } from '../../../QuestionStatsContext';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

const STATS_MAPPING = {
	answered          : '#DDEBC0',
	viewed            : '#F8AEA8',
	marked_for_review : '#CED1ED',
	not_viewed        : '#FDFBF6',
};

function QuestionsCount() {
	const {
		total_question_count,
		user_appearance = [],
		setSubQuestion,
		data = {},
		setCurrentQuestion,
		currentQuestion,
		fetchQuestions,
	} = useContext(QuestionStatsContext);

	const handleChangeQuestion = ({ index }) => {
		if (index === GLOBAL_CONSTANTS?.zeroth_index
			|| data?.data?.[index - FIRST_INDEX].answer_state !== 'not_viewed') {
			setCurrentQuestion(index + FIRST_INDEX);
		}

		setSubQuestion(FIRST_INDEX);

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
							cursor          : `${(index === GLOBAL_CONSTANTS?.zeroth_index
								|| question?.answer_state !== 'not_viewed')
								? 'pointer' : 'not-allowed'}`,
						}}
						className={`${styles.question_count} 
						${Number(currentQuestion) === index + FIRST_INDEX && styles.active}`}
					>
						{index + FIRST_INDEX}
					</div>
				);
			})}

			{len ? [...Array(len)].map((item, index) => (
				<div
					role="presentation"
					style={{ backgroundColor: '#FDFBF6', cursor: 'not-allowed' }}
					className={`${styles.question_count} ${Number(currentQuestion) - user_appearance.length
						=== index + FIRST_INDEX && styles.active}`}
					key={item}
				>
					{user_appearance.length + index + FIRST_INDEX}
				</div>
			)) : null}
		</div>
	);
}

export default QuestionsCount;
