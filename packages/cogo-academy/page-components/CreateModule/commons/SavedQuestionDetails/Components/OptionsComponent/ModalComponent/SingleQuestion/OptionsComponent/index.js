import getAlphabets from '../../../../../../../utils/getAlphabets';

import styles from './styles.module.css';

const alphabets = getAlphabets('A', 'Z');

function OptionsComponent({ primary_question_type = '', test_question_answers = [] }) {
	if (primary_question_type === 'subjective') {
		return (
			<div
				className={`${styles.answer_text} ${styles.correct}`}
				dangerouslySetInnerHTML={{ __html: test_question_answers?.[0].answer_text }}
			/>

		);
	}

	return (
		<>
			{test_question_answers.map((answer, index) => (
				<div
					key={answer?.id}
					className={`${styles.answer_text} ${answer.is_correct ? styles.correct : null}`}
				>
					<span>
						{`${alphabets[index]}) `}
					</span>
					<span>{answer?.answer_text}</span>
				</div>
			))}
		</>
	);
}

export default OptionsComponent;
