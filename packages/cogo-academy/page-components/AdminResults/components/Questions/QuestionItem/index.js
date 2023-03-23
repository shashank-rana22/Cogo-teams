import { Pill } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function QuestionItem({ question_item }) {
	const {
		appeared_percent,
		correct_percentage,
		difficulty,
		question,
		question_type,
		students_appeared,
		topic,
	} = question_item || {};

	const handleOpenQuestion = () => {

	};

	return (
		<div role="presentation" onClick={handleOpenQuestion} className={styles.container}>
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

			<div className={styles.icon}>
				<IcMArrowRotateDown styles={{ width: 8, height: 6 }} />
			</div>
		</div>
	);
}

export default QuestionItem;
