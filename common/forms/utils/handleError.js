const handleError = (props) => {
	const {
		errorClass, error, rules, errorName, label,
	} = props;
	const errorMessage = [];

	if (errorClass) {
		if (rules?.required && error.type === 'required') {
			errorMessage.push(error?.message || `${errorName || label} is Required`);
		}
		if (rules?.min && error.type === 'min') {
			errorMessage.push(
				`${errorName || label} cannot be less than ${rules.min}`,
			);
		}
		if (rules?.max && error.type === 'max') {
			errorMessage.push(
				`${errorName || label} cannot be greater than ${rules.max}`,
			);
		}
		if (rules?.minLength && error.type === 'minLength') {
			errorMessage.push(
				`${errorName || label} should be ${rules.minLength} character(s) long`,
			);
		}
		if (rules?.maxLength && error.type === 'maxLength') {
			errorMessage.push(
				`${errorName || label} should be less than ${rules.maxLength}`,
			);
		}
	}
	if (errorMessage.length) {
		return errorMessage.join(' ,');
	}
	return error?.message;
};

export default handleError;
