import SingleQuestion from '../SingleQuestion';

import Paragraph from './Paragraph';
import styles from './styles.module.css';

function CaseStudy({ question = [], currentQuestion, total_question, answer, setAnswer }) {
	// console.log('lkjhgf', question);
	return (
		<div className={styles.container}>
			<Paragraph content={question?.case_study_description} />

			<SingleQuestion
				question={question}
				currentQuestion={currentQuestion}
				total_question={total_question}
				answer={answer}
				setAnswer={setAnswer}
			/>
		</div>
	);
}

export default CaseStudy;
