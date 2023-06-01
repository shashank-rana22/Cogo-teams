const getTestStatus = ({ retest, activeAttempt, test_status }) => {
	if (retest && activeAttempt === 'attempt_1') {
		return 'published';
	}
	return test_status;
};

export default getTestStatus;
