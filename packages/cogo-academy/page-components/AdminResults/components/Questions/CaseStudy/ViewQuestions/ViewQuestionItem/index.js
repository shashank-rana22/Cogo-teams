import { Accordion } from '@cogoport/components';

import QuestionCard from '../../QuestionCard';

import styles from './styles.module.css';
import TitleComponent from './TitleComponent';

function ViewQuestionItem({ question_item = {}, index = 0, test_id = '' }) {
	const {
		id = '',
		question_text = '',
		correct_answer_percentage = '',
		question_type = '',
	} = question_item || {};

	return (
		<div className={styles.outer_container}>
			<Accordion
				type="text"
				title={(
					<TitleComponent
						correct_answer_percentage={correct_answer_percentage}
						question={question_text}
						question_type={question_type}
					/>
				)}
				key={index}
				style={{ width: '100%' }}
			>
				<QuestionCard
					question_id={id}
					test_id={test_id}
					index={index}
				/>
			</Accordion>
		</div>
	);
}

export default ViewQuestionItem;
