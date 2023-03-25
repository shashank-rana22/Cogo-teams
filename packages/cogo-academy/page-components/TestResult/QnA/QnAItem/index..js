import QuestionCard from './QuestionCard';
import styles from './styles.module.css';

function QnAItem({ data = {}, index = 0 }) {
	const { questions_data = {}, answers = [] } = data;

	return (
		<div className={styles.container}>
			<div className={styles.question_card}>
				<QuestionCard answers={answers} question={questions_data.question} index={index} />
			</div>

			{questions_data.explanation?.[0] ? (
				<div className={styles.explanation}>
					<b>Explanation:</b>
					{' '}
					{questions_data.explanation?.[0]}
				</div>
			) : null}
		</div>
	);
}

export default QnAItem;
