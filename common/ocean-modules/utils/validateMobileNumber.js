const VALUE_LENGTH = 2;

const validateMobileNumber = (val) => {
	const keys = Object.keys(val || {});
	if (keys.length !== VALUE_LENGTH) {
		return 'Mobile number is required';
	}

	let isValue = true;

	keys.forEach((key) => {
		if (!val?.[key] && isValue) { isValue = false; }
	});

	if (!isValue) {
		return 'Mobile number is required';
	}

	return true;
};
export default validateMobileNumber;
