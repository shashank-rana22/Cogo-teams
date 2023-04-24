import { Pill } from '@cogoport/components';

import getAlphabets from '../../../../../../utils/getAlphabets';

import styles from './styles.module.css';

const alphabets = getAlphabets('A', 'Z');

const TYPE_MAPPING = {
	single_correct : 'Single answer Choice',
	multi_correct  : 'Multi answer Choice',
	subjective     : 'subjective Question',
};

const DIFFICULTY_MAPPING = {
	low    : 'Low Difficulty',
	medium : 'Medium Difficulty',
	high   : 'High Difficulty',
};

function SingleQuestion({ data, primary_question_type, case_index, length }) {
	const { test_question_answers = [], question_type, difficulty_level, question_text, explanation = [] } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.question_text}>{`Q. ${question_text}`}</div>

			<div className={styles.question_container}>
				<div className={styles.question_type}>{TYPE_MAPPING[question_type]}</div>
				<Pill size="md" color="#F3FAFA">{DIFFICULTY_MAPPING[difficulty_level]}</Pill>
			</div>

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

			{explanation?.[0] && explanation?.[0] !== '<p><br></p>' ? (
				<div className={styles.explanation}>
					<b>Explanation:</b>
					{' '}
					<div dangerouslySetInnerHTML={{ __html: explanation?.[0] }} />
				</div>
			) : null}

			{primary_question_type === 'case_study'
							&& case_index !== length - 1 ? (
								<div className={styles.border} />
				) : null}
		</div>
	);
}

export default SingleQuestion;
