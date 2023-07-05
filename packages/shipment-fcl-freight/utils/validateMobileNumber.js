const MOBILE_NUMBER_KEYS_LENGTH = 2;

const validateMobileNumber = (val) => {
	const keys = Object.keys(val || {});
	if (keys.length !== MOBILE_NUMBER_KEYS_LENGTH) {
		return 'Mobile number is required';
	}

	return true;
};
export default validateMobileNumber;
