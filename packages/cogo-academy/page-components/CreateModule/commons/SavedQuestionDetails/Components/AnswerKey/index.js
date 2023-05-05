import { Tooltip } from '@cogoport/components';
import { useMemo } from 'react';

import getCorrectAnswers from '../../utils/getCorrectAnswers';
import getCorrectAnswersCombined from '../../utils/getCorrectAnswersCombined';
import CaseAnswerKey from '../CaseAnswerKey';

import styles from './styles.module.css';

function AnswerKey({ item, caseToShow, setQuestionToShow = () => {} }) {
	const { test_question_answers = [] } = item || {};

	const filterCorrectOptions = useMemo(() => (test_question_answers || []).filter(
		(correctAnswer) => correctAnswer.is_correct,
	), [test_question_answers]);

	const correctAnswers = useMemo(
		() => getCorrectAnswersCombined({ correctOptions: filterCorrectOptions }),
		[filterCorrectOptions],
	);

	if (item?.question_type === 'case_study') {
		return (
			<CaseAnswerKey
				item={item}
				setQuestionToShow={setQuestionToShow}
				caseToShow={caseToShow}
			/>
		);
	}

	if (item?.question_type === 'subjective') {
		return '--';
	}

	return (
		<Tooltip
			className={styles.tooltip}
			interactive
			content={(
				<div className={styles.whole_subjective}>
					{item?.question_type === 'subjective' ? (
						<div dangerouslySetInnerHTML={{ __html: test_question_answers[0].answer_text }} />
					) : (
						<div className={styles.flex_column}>
							{(correctAnswers || []).map((correctAnswer) => (
								<div key={correctAnswer} className={styles.answer}>{correctAnswer}</div>
							))}
						</div>
					)}
				</div>
			)}
		>
			<div
				role="presentation"
				onClick={() => setQuestionToShow(item?.id)}
				className={styles.answer_key}
			>
				{getCorrectAnswers({ answers: test_question_answers, question_type: item?.question_type })}
			</div>
		</Tooltip>
	);
}

export default AnswerKey;
