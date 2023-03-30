import { Tooltip } from '@cogoport/components';

import getCorrectAnswers from '../../utils/getCorrectAnswers';
import getCorrectAnswersCombined from '../../utils/getCorrectAnswersCombined';

import styles from './styles.module.css';

function CaseAnswerKey({ item, caseToShow }) {
	const { test_case_study_questions = [] } = item || {};

	return (
		<div className={styles.flex_column}>
			<div className={styles.flex_row}>
				<div className={styles.bold}>{`+${test_case_study_questions.length} Sub Questions`}</div>
			</div>

			{item.id === caseToShow
				? (
					test_case_study_questions.map((item1) => (
						<Tooltip content={(
							<div className={styles.flex_column}>
								{(getCorrectAnswersCombined({
									correctOptions:
									(item1?.test_question_answers || []).filter((item2) => item2.is_correct),
								} || [])).map((item2) => <div className={styles.answer}>{item2}</div>)}
							</div>
						)}
						>
							<div className={styles.answer_key}>
								{getCorrectAnswers({ answers: item1?.test_question_answers })}
							</div>
						</Tooltip>
					))
				)
				: null}
		</div>
	);
}

export default CaseAnswerKey;
