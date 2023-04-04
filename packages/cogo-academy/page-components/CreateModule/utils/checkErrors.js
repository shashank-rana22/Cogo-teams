const checkErrors = ({ options, question_type }) => {
	const correctOptions = options.filter((item) => item.is_correct === 'true');

	const allOptions = options.map((item) => item?.answer_text);

	const uniqueOptions = new Set(allOptions);

	const correctOptionsLength = correctOptions.length;

	if (!correctOptionsLength) {
		return 'Atleast one option should be true';
	}

	if (question_type === 'single_correct' && correctOptionsLength > 1) {
		return 'Only one option should be true';
	}

	if (allOptions.length !== [...uniqueOptions].length) {
		return 'All the options should be unique';
	}

	return 'noError';
};

export default checkErrors;
