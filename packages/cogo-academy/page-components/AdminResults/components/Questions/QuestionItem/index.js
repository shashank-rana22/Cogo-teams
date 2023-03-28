import { Accordion, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import QuestionCard from '../../../../TestResult/QnA/QnAItem/QuestionCard';

import styles from './styles.module.css';

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

	const renderTitle = () => (
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
				{appeared_percent.toFixed(2)}
				%
				)
			</div>

			<div className={styles.small_section}>
				{correct_percentage}
				%
			</div>
		</div>
	);

	return (
		<div className={styles.outer_container}>
			<Accordion type="text" title={renderTitle()} key={index} style={{ width: '100%' }}>
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
