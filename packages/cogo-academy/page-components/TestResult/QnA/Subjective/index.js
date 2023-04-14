import styles from './styles.module.css';
import SubjectiveItem from './SubjectiveItem';

function Subjective({ questions, user_id = '', test_id = '', count_till_now, view = '' }) {
	return (
		<div className={styles.container}>

			{(questions || []).map((question, index) => (
				<div key={question.question_data?.id} className={styles.question_card}>
					<SubjectiveItem
						data={question}
						index={count_till_now + index + 1}
						view={view}
						user_id={user_id}
						test_id={test_id}
					/>
				</div>
			))}
		</div>
	);
}

export default Subjective;
