import QuestionCard from '../../../CreateModule/commons/QuestionCard';

import styles from './styles.module.css';

function QnAItem({ data = {}, index = 0, user_name = '' }) {
	const { question_data = {}, answers = [], user_answers = [] } = data;

	return (
		<div className={styles.container}>
			<div className={styles.question_card}>
				<QuestionCard
					answers={answers}
					question={question_data.question}
					user_answers={user_answers}
					index={index}
					user_name={user_name}
				/>

			</div>

			{question_data.explanation?.[0] ? (
				<div className={styles.explanation}>
					<b>Explanation:</b>
					{' '}
					<div dangerouslySetInnerHTML={{ __html: question_data.explanation?.[0] }} />
				</div>
			) : null}
		</div>
	);
}

export default QnAItem;
