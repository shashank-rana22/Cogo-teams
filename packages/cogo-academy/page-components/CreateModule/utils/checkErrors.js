const checkErrors = ({ options, question_type }) => {
	const correctOptions = options.filter((item) => item.is_correct === 'true');

	const correctOptionsLength = correctOptions.length;

	if (!correctOptionsLength) {
		return 'Atleast one option should be true';
	}

	if (question_type === 'single_correct' && correctOptionsLength > 1) {
		return 'Only one option should be true';
	}

	return 'noError';
};

export default checkErrors;
