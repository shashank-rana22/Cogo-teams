import Description from './Description';
import Header from './Header';
import styles from './styles.module.css';

function CaseStudy({ question_item, index = 0, test_id = '', activeAttempt }) {
	const {
		topic = '',
		question_text = '',
		difficulty_level = '',
		no_of_questions = 0,
		user_appeared_count = 0,
		id = '',
	} = question_item || {};

	return (
		<div className={styles.case_study_container}>
			<Header
				topic={topic}
				question_text={question_text}
				index={index}
				difficulty_level={difficulty_level}
				no_of_questions={no_of_questions}
				user_appeared_count={user_appeared_count}
			/>

			<Description
				question_text={question_text}
				id={id}
				test_id={test_id}
				activeAttempt={activeAttempt}
			/>
		</div>
	);
}

export default CaseStudy;
