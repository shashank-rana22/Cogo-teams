/* eslint-disable react-hooks/exhaustive-deps */
import { CheckboxGroup, RadioGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

function SingleQuestion({ question = {}, currentQuestion, total_question, loading, answer = [], setAnswer }) {
	const { question_text, options = [], question_type, test_question_answer_ids } = question;

	const answerOptions = (options || [])?.map((answer_option) => ({
		label : answer_option?.answer_text,
		value : answer_option?.id,
	}));

	const Element = question_type === 'multi_correct' ? CheckboxGroup : RadioGroup;

	useEffect(() => {
		if (question_type !== 'multi_correct') {
			setAnswer(test_question_answer_ids?.[0] || '');
		} else {
			setAnswer(test_question_answer_ids || []);
		}
	}, [JSON.stringify(question)]);

	if (loading || isEmpty(question)) {
		return null;
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.question_count}>
					Question
					{' '}
					{currentQuestion}
					{' '}
					of
					{' '}
					{total_question}
				</div>
				<p className={styles.question_type}>Single Answer Correct</p>
			</div>
			<div className={styles.question}>
				Q
				{' '}
				{question_text}
			</div>

			<Element
				options={answerOptions}
				onChange={setAnswer}
				value={answer || []}
				style={{ marginLeft: 'auto' }}
			/>
		</div>
	);
}

export default SingleQuestion;
