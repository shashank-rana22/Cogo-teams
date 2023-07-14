import { Tooltip } from '@cogoport/components';

import getCorrectAnswers from '../../utils/getCorrectAnswers';

import CorrectAnswersCombined from './CorrectAnswersCombined';
import styles from './styles.module.css';

function CaseAnswerKey({ item, caseToShow, setQuestionToShow = () => {} }) {
	const { test_case_study_questions = [] } = item || {};

	return (
		<div className={styles.flex_column}>
			<div
				role="presentation"
				onClick={() => setQuestionToShow(item?.id)}
				className={styles.flex_row}
			>
				<div className={styles.bold}>{`+${test_case_study_questions.length} Sub Questions`}</div>
			</div>

			{item.id === caseToShow
				? (
					test_case_study_questions.map((testCaseStudyQuestion) => (
						<Tooltip
							key={testCaseStudyQuestion?.id}
							content={<CorrectAnswersCombined testCaseStudyQuestion={testCaseStudyQuestion} />}
						>
							<div className={styles.answer_key}>
								{getCorrectAnswers({ answers: testCaseStudyQuestion?.test_question_answers })}
							</div>
						</Tooltip>
					))
				)
				: null}
		</div>
	);
}

export default CaseAnswerKey;
