import getCorrectAnswersCombined from './getCorrectAnswersCombined';

const getCorrectAnswers = ({ answers = [] }) => {
	const correctOptions = answers.filter((item) => item.is_correct);
	const correctAnswers = getCorrectAnswersCombined({ correctOptions });

	return correctAnswers.join(', ');
};

export default getCorrectAnswers;
