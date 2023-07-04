import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import OptionsComponent from './OptionsComponent';
import styles from './styles.module.css';

const OFFSET = 1;

const TYPE_MAPPING = {
	single_correct : 'Single answer Choice',
	multi_correct  : 'Multi answer Choice',
	subjective     : 'Subjective Question',
};

const DIFFICULTY_MAPPING = {
	low    : 'Low Difficulty',
	medium : 'Medium Difficulty',
	high   : 'High Difficulty',
};

function SingleQuestion({ data, primary_question_type, case_index, length }) {
	const {
		test_question_answers = [],
		question_type,
		difficulty_level,
		question_text,
		explanation = [],
	} = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.question_text}>

				<div>
					Q.
					{' '}
				</div>

				<div
					dangerouslySetInnerHTML={{ __html: question_text }}
				/>

			</div>

			<div className={styles.question_container}>
				<div className={styles.question_type}>
					{TYPE_MAPPING[question_type]}
				</div>
				<Pill size="md" color="#F3FAFA">
					{DIFFICULTY_MAPPING[difficulty_level]}
				</Pill>
			</div>

			<OptionsComponent
				primary_question_type={primary_question_type}
				test_question_answers={test_question_answers}
			/>

			{explanation?.[GLOBAL_CONSTANTS.zeroth_index]
			&& explanation?.[GLOBAL_CONSTANTS.zeroth_index] !== '<p><br></p>' ? (
				<div className={styles.explanation}>
					<b>Explanation:</b>
					{' '}
					<div dangerouslySetInnerHTML={{ __html: explanation?.[GLOBAL_CONSTANTS.zeroth_index] }} />
				</div>
				) : null}

			{primary_question_type === 'case_study' && case_index !== length - OFFSET ? (
				<div className={styles.border} />
			) : null}
		</div>
	);
}

export default SingleQuestion;
