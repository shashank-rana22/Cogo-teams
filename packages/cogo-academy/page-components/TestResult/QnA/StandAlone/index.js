import QnAItem from '../QnAItem';

import styles from './styles.module.css';

function StandAlone({ questions, user_name }) {
	return (
		<div className={styles.container}>
			{(questions || []).map((question, index) => (
				<div key={question.question_data.id} className={styles.question_card}>
					<QnAItem data={question} index={index} user_name={user_name} />
				</div>
			))}
		</div>
	);
}

export default StandAlone;
