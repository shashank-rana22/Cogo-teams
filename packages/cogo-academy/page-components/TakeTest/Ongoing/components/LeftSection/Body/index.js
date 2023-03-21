// import { useState } from 'react';
import CaseStudy from './CaseStudy';
// import quizData from './dummydata';
import SingleQuestion from './SingleQuestion';

function Body({ data = [], currentQuestion, setCurrentQuestion, total_question, answer = '', setAnswer, loading }) {
	return (
		<div>
			{!data?.primary_question_type
				? (
					<SingleQuestion
						question={data}
						currentQuestion={currentQuestion}
						setCurrentQuestion={setCurrentQuestion}
						total_question={total_question}
						answer={answer}
						setAnswer={setAnswer}
						loading={loading}
					/>
				)
				: (
					<CaseStudy
						question={data}
						currentQuestion={currentQuestion}
						setCurrentQuestion={setCurrentQuestion}
						total_question={total_question}
						answer={answer}
						setAnswer={setAnswer}
						loading={loading}
					/>
				) }
		</div>
	);
}

export default Body;
