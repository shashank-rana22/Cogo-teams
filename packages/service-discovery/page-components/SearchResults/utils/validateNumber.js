const validate = (val) => {
	if (Number.isNaN(Number(val))) {
		return 'Not a valid Number';
	}

	return null;
};
export default validate;
