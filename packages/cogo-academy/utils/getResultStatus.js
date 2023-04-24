const getResultStatus = ({ cut_of_percentage, user_percentage }) => {
	if (user_percentage < cut_of_percentage) {
		return 'failed';
	}

	if (user_percentage > (100 - ((100 - cut_of_percentage) / 2))) {
		return 'passed';
	}

	return 'intermediate';
};

export default getResultStatus;
