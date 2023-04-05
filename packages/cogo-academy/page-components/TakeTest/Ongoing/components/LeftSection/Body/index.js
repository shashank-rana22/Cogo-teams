import CaseStudy from './CaseStudy';
import SingleQuestion from './SingleQuestion';

function Body({
	data = {},
	currentQuestion,
	setCurrentQuestion,
	total_question,
	answer = '',
	setAnswer,
	loading,
	subQuestion,
	setSubQuestion,
}) {
	const { question_type } = data || {};

	return (
		<div key={`${loading}_${subQuestion}`}>
			{question_type !== 'case_study'
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
						subQuestion={subQuestion}
						setSubQuestion={setSubQuestion}
					/>
				) }
		</div>
	);
}

export default Body;
