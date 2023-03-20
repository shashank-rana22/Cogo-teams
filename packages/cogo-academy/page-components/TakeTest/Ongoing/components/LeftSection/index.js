import { useState } from 'react';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function LeftSection({ data = [], currentQuestion, setCurrentQuestion, loading }) {
	// console.log('abc', data?.data?.[currentQuestion]);
	const [answer, setAnswer] = useState('');

	return (
		<div className={styles.container}>
			<Header />

			<Body
				data={data?.data?.[currentQuestion - 1]}
				loading={loading}
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
				total_question={data?.data?.length}
				answer={answer}
				setAnswer={setAnswer}
			/>

			<Footer
				data={data?.data?.[currentQuestion - 1]}
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
				total_question={data?.data?.length}
				answer={answer}
			/>
		</div>
	);
}

export default LeftSection;
