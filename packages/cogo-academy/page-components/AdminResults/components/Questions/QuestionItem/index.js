import { Accordion, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import QuestionCard from '../../../../CreateModule/commons/QuestionCard';
import toFixed from '../../../../CreateModule/utils/toFixed';

import styles from './styles.module.css';

function TitleComponent({
	appeared_percent,
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
				{toFixed(appeared_percent, 2)}
				%
				)
			</div>

			<div className={styles.small_section}>
				{correct_percentage}
				%
			</div>
		</div>
	);
}

function QuestionItem({ question_item, index = 0 }) {
	const {
		appeared_percent,
		correct_percentage,
		difficulty,
		question,
		answers,
		question_type,
		students_appeared,
		topic,
		case_study,
	} = question_item || {};

	return (
		<div className={styles.outer_container}>
			<Accordion
				type="text"
				title={(
					<TitleComponent
						appeared_percent={appeared_percent}
						correct_percentage={correct_percentage}
						difficulty={difficulty}
						students_appeared={students_appeared}
						topic={topic}
						question={question}
						question_type={question_type}
					/>
				)}
				key={index}
				style={{ width: '100%' }}
			>
				<QuestionCard
					answers={answers}
					question={question}
					index={index}
					question_type={question_type}
					case_study={case_study}
				/>
			</Accordion>
		</div>

	);
}

export default QuestionItem;
