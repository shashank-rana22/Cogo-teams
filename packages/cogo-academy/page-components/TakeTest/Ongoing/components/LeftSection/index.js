import { useState } from 'react';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function LeftSection({
	data = [],
	testData,
	currentQuestion,
	setCurrentQuestion,
	loading,
	fetchQuestions,
}) {
	const [answer, setAnswer] = useState('');

	return (
		<div key={data?.data} className={styles.container}>
			<Header
				data={data}
				testData={testData}
				total_question={data?.total_questions}
			/>

			<Body
				data={data?.data?.[currentQuestion - 1]}
				loading={loading}
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
				total_question={data?.total_questions}
				answer={answer}
				setAnswer={setAnswer}
			/>

			<Footer
				data={data?.data?.[currentQuestion - 1]}
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
				total_question={data?.total_questions}
				answer={answer}
				fetchQuestions={fetchQuestions}
			/>
		</div>
	);
}

export default LeftSection;
