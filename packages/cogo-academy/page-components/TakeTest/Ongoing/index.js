import { useState } from 'react';

import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';
import useFetchQuestionsList from './hooks/useFetchQuestionList';
import styles from './styles.module.css';

function Ongoing({ testData, startTiming }) {
	const page = localStorage.getItem('currentQuestion');
	const [currentQuestion, setCurrentQuestion] = useState(page || 1);
	// setCurrentQuestion(1);
	const duration = testData?.test_duration;
	const { loading, data, fetchQuestions } = useFetchQuestionsList({ currentQuestion, startTiming, duration });

	return ((
		<div className={styles.main_container}>
			<div className={styles.left_container}>
				<LeftSection
					data={data}
					testData={testData}
					loading={loading}
					currentQuestion={currentQuestion}
					setCurrentQuestion={setCurrentQuestion}
					startTiming={startTiming}
					fetchQuestions={fetchQuestions}
				/>
			</div>

			<div key={data?.data} className={styles.right_container}>
				<RightSection
					data={data}
					loading={loading}
					currentQuestion={currentQuestion}
					fetchQuestions={fetchQuestions}
					setCurrentQuestion={setCurrentQuestion}
				/>
			</div>
		</div>
	)
	);
}

export default Ongoing;
