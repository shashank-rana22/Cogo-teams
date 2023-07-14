const MIN_COUNT = 0;

const getErrorMessage = (props) => {
	const { error, rules, label } = props;
	const ERROR_MESSAGE = [];

	const { required, min, max, minLength, maxLength } = rules || {};
	const { type, message } = error || {};

	if (error) {
		if (required && type === 'required') {
			ERROR_MESSAGE.push(error?.message || `${label} is Required`);
		}
		if ((min || min === MIN_COUNT) && type === 'min') {
			ERROR_MESSAGE.push(
				`${label} cannot be less than ${min}`,
			);
		}
		if (max && type === 'max') {
			ERROR_MESSAGE.push(
				`${label} cannot be greater than ${max}`,
			);
		}
		if (minLength && type === 'minLength') {
			ERROR_MESSAGE.push(
				`${label} should be ${minLength} character(s) long`,
			);
		}
		if (maxLength && type === 'maxLength') {
			ERROR_MESSAGE.push(
				`${label} should be less than ${maxLength}`,
			);
		}
	}
	if (ERROR_MESSAGE.length) {
		return ERROR_MESSAGE.join(' ,');
	}
	return message;
};

export default getErrorMessage;
