import { isEmpty } from '@cogoport/utils';

import QuestionsCount from './QuestionsCount';
import QuestionStats from './QuestionStats';
import styles from './styles.module.css';

function Body({ data = [], loading, setCurrentQuestion, currentQuestion, fetchQuestions }) {
	if (loading || isEmpty(data)) {
		return null;
	}
	return (
		<div className={styles.container}>
			<QuestionStats
				data={data}
			/>

			<QuestionsCount
				data={data}
				fetchQuestions={fetchQuestions}
				loading={loading}
				setCurrentQuestion={setCurrentQuestion}
				currentQuestion={currentQuestion}
			/>
		</div>
	);
}

export default Body;
