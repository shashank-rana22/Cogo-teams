import { isEmpty } from '@cogoport/utils';

import QuestionsCount from './QuestionsCount';
import QuestionStats from './QuestionStats';
import styles from './styles.module.css';

function Body({
	data = {},
	loading,
	setCurrentQuestion,
	currentQuestion,
	fetchQuestions,
	total_question_count,
	user_appearance,
	setSubQuestion,
}) {
	if (loading || isEmpty(data)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<QuestionStats
				total_question_count={total_question_count}
				user_appearance={user_appearance}
			/>

			<QuestionsCount
				data={data}
				fetchQuestions={fetchQuestions}
				loading={loading}
				setCurrentQuestion={setCurrentQuestion}
				currentQuestion={currentQuestion}
				total_question_count={total_question_count}
				user_appearance={user_appearance}
				setSubQuestion={setSubQuestion}
			/>
		</div>
	);
}

export default Body;
