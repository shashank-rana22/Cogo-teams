const CHECK_MIN_PHONE_NO_LENGTH = 2;

const validateMobileNumber = (val) => {
	const keys = Object.keys(val || {});
	if (keys.length !== CHECK_MIN_PHONE_NO_LENGTH) {
		return 'Mobile number is required';
	}

	return true;
};
export default validateMobileNumber;
