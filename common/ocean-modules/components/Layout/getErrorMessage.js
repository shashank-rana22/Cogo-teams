const DEFAULT_MIN = 0;

const getErrorMessage = (props) => {
	const { error = {}, rules = {}, label = '' } = props || {};

	if (error?.message) return error.message;

	const ERROR_MESSAGES = [];

	if (error) {
		if (rules?.required && error?.type === 'required') {
			ERROR_MESSAGES.push(error?.message || `${label} is Required`);
		}

		if ((rules?.min || rules?.min === DEFAULT_MIN) && error?.type === 'min') {
			ERROR_MESSAGES.push(`${label} cannot be less than ${rules.min}`);
		}

		if (rules?.max && error?.type === 'max') {
			ERROR_MESSAGES.push(`${label} cannot be greater than ${rules.max}`);
		}

		if (rules?.minLength && error?.type === 'minLength') {
			ERROR_MESSAGES.push(`${label} should be ${rules.minLength} character(s) long`);
		}

		if (rules?.maxLength && error?.type === 'maxLength') {
			ERROR_MESSAGES.push(`${label} should be less than ${rules.maxLength}`);
		}
	}

	if (ERROR_MESSAGES.length) {
		return ERROR_MESSAGES.join(' ,');
	}

	return error?.message;
};

export default getErrorMessage;
