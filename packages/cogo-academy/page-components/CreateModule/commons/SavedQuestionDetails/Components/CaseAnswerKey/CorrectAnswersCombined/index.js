import { useMemo } from 'react';

import getCorrectAnswersCombined from '../../../utils/getCorrectAnswersCombined';

import styles from './styles.module.css';

function CorrectAnswersCombined({ testCaseStudyQuestion }) {
	const { test_question_answers = [] } = testCaseStudyQuestion || {};

	const filterCorrectOptions = useMemo(() => (test_question_answers || []).filter(
		(correctAnswer) => correctAnswer.is_correct,
	), [test_question_answers]);

	const correctAnswersCombined = useMemo(
		() => getCorrectAnswersCombined({ correctOptions: filterCorrectOptions }),
		[filterCorrectOptions],
	);

	return (
		<div className={styles.flex_column}>
			{(correctAnswersCombined || []).map((testQuestionAnswer) => (
				<div key={testQuestionAnswer} className={styles.answer}>
					{testQuestionAnswer}
				</div>
			))}
		</div>
	);
}

export default CorrectAnswersCombined;
