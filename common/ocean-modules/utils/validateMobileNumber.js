const validateMobileNumber = (val) => {
	const keys = Object.keys(val || {});
	if (keys.length !== 2) {
		return 'Mobile number is required';
	}

	return true;
};
export default validateMobileNumber;
