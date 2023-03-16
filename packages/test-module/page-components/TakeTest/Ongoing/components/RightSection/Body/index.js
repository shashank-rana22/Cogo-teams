import QuestionsCount from './QuestionsCount';
import QuestionStats from './QuestionStats';
import styles from './styles.module.css';

function Body() {
	return (
		<div className={styles.container}>
			<QuestionStats />

			<QuestionsCount />
		</div>
	);
}

export default Body;
