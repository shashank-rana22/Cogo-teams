const testStatus = (retest, activeAttempt, test_status) => {
	if (retest === true && activeAttempt === 'attempt_1') {
		return 'published';
	}
	return test_status;
};

export default testStatus;
