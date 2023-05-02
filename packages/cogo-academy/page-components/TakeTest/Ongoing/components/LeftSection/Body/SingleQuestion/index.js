import { CheckboxGroup, RadioGroup, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

import getAlphabets from '../../../../../../CreateModule/utils/getAlphabets';

import styles from './styles.module.css';

const alphabets = getAlphabets('A', 'Z');

function SingleQuestion({
	question = {},
	currentQuestion,
	total_question,
	loading,
	answer = [],
	setAnswer,
	subQuestion,
	from = 'stand_alone',
}) {
	const { question_text, test_question_answers = [], question_type } = question;

	const correctAnswerIds = useMemo(() => (test_question_answers || []).reduce((acc, c) => {
		if (c.selected_by_user) {
			acc.push(c.id);
		}
		return acc;
	}, []), [test_question_answers]);

	const answerOptions = (test_question_answers || [])?.map((answer_option) => ({
		label : answer_option?.answer_text,
		value : answer_option?.id,
	}));

	const Element = question_type === 'multi_correct' ? CheckboxGroup : RadioGroup;

	useEffect(() => {
		if (question_type !== 'multi_correct') {
			setAnswer(correctAnswerIds?.[0] || '');
		} else {
			setAnswer(correctAnswerIds || []);
		}
	}, [correctAnswerIds, question_type, setAnswer]);

	if (loading || isEmpty(question)) {
		<Placeholder height="40px" width="100%" />;
	}

	return (
		<div key={subQuestion} className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.question_count}>
					Question
					{' '}
					{from === 'case_study'
						? `${currentQuestion}${alphabets[subQuestion - 1].toLowerCase()}` : currentQuestion}
					{' '}
					of
					{' '}
					{total_question}
				</div>
				<p className={styles.question_type}>
					{' '}
					{question_type === 'multi_correct' ? <>Multiple Answers Correct </> : <>Single Answer Correct</> }
				</p>
			</div>

			<div
				className={styles.question_content}
				style={from === 'stand_alone' ? {
					overflowY: 'scroll',
				} : {}}
			>
				<div className={styles.question}>
					{question_text}
				</div>

				<Element
					options={answerOptions}
					onChange={setAnswer}
					value={answer || []}
					style={{ marginLeft: 'auto' }}
					className={styles.options}
				/>
			</div>
		</div>
	);
}

export default SingleQuestion;
