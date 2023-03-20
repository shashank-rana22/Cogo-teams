import { CheckboxGroup, RadioGroup } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function SingleQuestion({ question }) {
	const { question: description, options, isMulti, id } = question;

	const [answer, setAnswer] = useState('');

	const answerOptions = options.map((answer_option) => ({
		label : answer_option.answer,
		value : answer_option.answer,
	}));

	const Element = isMulti ? CheckboxGroup : RadioGroup;

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.question_count}>
					Question
					{' '}
					{id}
					{' '}
					of
					{' '}
					25
				</div>
				<p className={styles.question_type}>Single Answer Correct</p>
			</div>
			<div className={styles.question}>
				Q
				{' '}
				{description}
			</div>
			<Element
				options={answerOptions}
				onChange={setAnswer}
				value={answer}
				style={{ marginLeft: 'auto' }}
			/>
		</div>
	);
}

export default SingleQuestion;
