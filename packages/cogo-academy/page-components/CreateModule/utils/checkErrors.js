const checkErrors = ({ options, question_type, hasText }) => {
	const correctOptions = options.filter((item) => item.is_correct === 'true');

	const allOptions = options.map((item) => item?.answer_text);

	const uniqueOptions = new Set(allOptions);

	const correctOptionsLength = correctOptions.length;

	if (allOptions.length < 2) {
		return 'Atleast two option should be present';
	}

	if (!correctOptionsLength) {
		return 'Atleast one option should be true';
	}

	if (question_type === 'single_correct' && correctOptionsLength > 1) {
		return 'Only one option should be true';
	}

	if (allOptions.length !== [...uniqueOptions].length) {
		return 'All the options should be unique';
	}

	if (!hasText) {
		return 'Question is required';
	}

	return 'noError';
};

export default checkErrors;
