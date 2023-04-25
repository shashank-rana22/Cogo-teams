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
	uploadValue,
	setUploadValue,
}) {
	const { question_type } = data || {};

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

			{question_type === 'subjective' && (
				<Subjective
					currentQuestion={currentQuestion}
					total_question={total_question}
					question={data}
					subjectiveAnswer={subjectiveAnswer}
					setSubjectiveAnswer={setSubjectiveAnswer}
					uploadValue={uploadValue}
					setUploadValue={setUploadValue}
				/>
			)}
		</div>
	);
}

export default Body;
