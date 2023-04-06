import { useState } from 'react';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function LeftSection({
	data = {},
	testData,
	currentQuestion,
	setCurrentQuestion,
	loading,
	fetchQuestions,
	setShowLeaveTestModal,
	setShowTimeOverModal,
	showTimeOverModal,
	start_time,
	total_question_count,
	test_user_mapping_id,
	user_appearance,
	subQuestion,
	setSubQuestion,
}) {
	const [answer, setAnswer] = useState('');

	return (
		<div className={styles.container}>
			<Header
				data={data}
				testData={testData}
				total_question={total_question_count}
				setShowTimeOverModal={setShowTimeOverModal}
				showTimeOverModal={showTimeOverModal}
				start_time={start_time}
				user_appearance={user_appearance}
			/>

			<Body
				data={data}
				loading={loading}
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
				total_question={total_question_count}
				answer={answer}
				setAnswer={setAnswer}
				subQuestion={subQuestion}
				setSubQuestion={setSubQuestion}
			/>

			<Footer
				data={data}
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
				total_question={total_question_count}
				answer={answer}
				fetchQuestions={fetchQuestions}
				setShowLeaveTestModal={setShowLeaveTestModal}
				setSubQuestion={setSubQuestion}
				subQuestion={subQuestion}
				test_user_mapping_id={test_user_mapping_id}
				user_appearance={user_appearance}
				loading={loading}
			/>
		</div>
	);
}

export default LeftSection;
