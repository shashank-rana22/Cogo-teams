import styles from './styles.module.css';

function QuestionsCount() {
	const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

	return (
		<div className={styles.container}>
			{a.map((question) => (
				<div className={styles.question_count}>{question}</div>
			))}
		</div>
	);
}

export default QuestionsCount;
