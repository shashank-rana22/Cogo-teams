// import { useState } from 'react';
import CaseStudy from './CaseStudy';
// import quizData from './dummydata';
import SingleQuestion from './SingleQuestion';

function Body({ data = [], currentQuestion, setCurrentQuestion, total_question, answer, setAnswer }) {
	// console.log('data::::', data);
	return (
		<div>
			{data?.primary_question_type !== 'case_study'
				? (
					<SingleQuestion
						question={data}
						currentQuestion={currentQuestion}
						setCurrentQuestion={setCurrentQuestion}
						total_question={total_question}
						answer={answer}
						setAnswer={setAnswer}
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
					/>
				) }
			{/* {QUESTION_COMPONENT_MAPPING.single_correct.component} */}
		</div>
	);
}

export default Body;
