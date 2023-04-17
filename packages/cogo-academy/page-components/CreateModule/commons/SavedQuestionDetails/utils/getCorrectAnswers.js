import getCorrectAnswersCombined from './getCorrectAnswersCombined';

const getCorrectAnswers = ({ answers = [], question_type = '' }) => {
	if (question_type === 'subjective') {
		return <div dangerouslySetInnerHTML={{ __html: answers[0].answer_text }} />;
	}
	const correctOptions = answers.filter((item) => item.is_correct);
	const correctAnswers = getCorrectAnswersCombined({ correctOptions });

	return correctAnswers.join(', ');
};

export default getCorrectAnswers;
