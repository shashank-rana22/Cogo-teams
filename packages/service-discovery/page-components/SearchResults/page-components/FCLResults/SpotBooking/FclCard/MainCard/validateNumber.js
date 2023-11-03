const validate = (val) => {
	if (Number.isNaN(Number(val))) {
		return 'Not a valid Number';
	}

	if (Number(val) < 0) {
		return 'Enter valid number';
	}

	return null;
};
export default validate;
