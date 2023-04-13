import CaseStudy from './CaseStudy';
import SingleQuestion from './SingleQuestion';
import Subjective from './Subjective';

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
	setSubjectiveAnswer,
	subjectiveAnswer,
}) {
	const { question_type } = data || {};

	// console.log('data', data);
	// console.log('currentQuestion', currentQuestion);
	// console.log('total_question', total_question);
	// console.log('answer', answer);

	console.log(question_type);
	return (
		<div key={`${loading}_${subQuestion}`}>
			{(question_type === 'single_correct' || question_type === 'multi_correct')
				&& (
					<SingleQuestion
						question={data}
						currentQuestion={currentQuestion}
						setCurrentQuestion={setCurrentQuestion}
						total_question={total_question}
						answer={answer}
						setAnswer={setAnswer}
						loading={loading}
					/>
				)}
			{question_type === 'case_study' && (
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
			)}
			{
				question_type === 'subjective' && (
					<Subjective
						currentQuestion={currentQuestion}
						total_question={total_question}
						question={data}
						subjectiveAnswer={subjectiveAnswer}
						setSubjectiveAnswer={setSubjectiveAnswer}
					/>
				)
			}
		</div>
	);
}

export default Body;
