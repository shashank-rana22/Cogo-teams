import { Accordion, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import toFixed from '../../../../CreateModule/utils/toFixed';
import QuestionCard from '../CaseStudy/QuestionCard';

import styles from './styles.module.css';

function TitleComponent({
	user_appeared_percent,
	correct_percentage,
	difficulty,
	students_appeared,
	topic,
	question,
	question_type,
}) {
	return (
		<div role="presentation" className={styles.container}>
			<div className={styles.small_section}>
				<Pill size="md" color="#F3FAFA">{topic}</Pill>
			</div>

			<div className={styles.section}>
				{question}
			</div>

			<div className={styles.small_section}>
				{startCase(question_type)}
			</div>

			<div className={styles.small_section}>
				{startCase(difficulty)}
			</div>

			<div className={styles.small_section}>
				{students_appeared}
				{' '}
				(
				{toFixed(user_appeared_percent, 2)}
				%
				)
			</div>

			<div className={styles.small_section}>
				{correct_percentage}
			</div>
		</div>
	);
}

function QuestionItem({ question_item = {}, index = 0, test_id = '' }) {
	const {
		id = '',
		appeared_percent = '',
		correct_answer_percentage = '',
		difficulty_level = '',
		question_text = '',
		question_type = '',
		user_appeared_count = '',
		user_appeared_percent = '',
		topic = '',
	} = question_item || {};

	return (
		<div className={styles.outer_container}>
			<Accordion
				type="text"
				title={(
					<TitleComponent
						appeared_percent={appeared_percent}
						correct_percentage={correct_answer_percentage}
						difficulty={difficulty_level}
						students_appeared={user_appeared_count}
						user_appeared_percent={user_appeared_percent}
						topic={topic}
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

export default QuestionItem;
