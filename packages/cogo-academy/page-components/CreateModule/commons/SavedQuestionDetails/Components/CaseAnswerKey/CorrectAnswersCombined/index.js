import { useMemo } from 'react';

import getCorrectAnswersCombined from '../../../utils/getCorrectAnswersCombined';

import styles from './styles.module.css';

function CorrectAnswersCombined({ testCaseStudyQuestion }) {
	const correctAnswersCombined = useMemo(() => getCorrectAnswersCombined({
		correctOptions: (testCaseStudyQuestion?.test_question_answers || []).filter(
			(testQuestionAnswers) => testQuestionAnswers.is_correct,
		),
	}), [testCaseStudyQuestion]);

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
