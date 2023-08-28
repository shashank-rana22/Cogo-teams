const MIN_COUNT = 0;

const getErrorMessage = (props) => {
	const { error, rules, label, t } = props;
	const ERROR_MESSAGE = [];

	const { required, min, max, minLength, maxLength } = rules || {};
	const { type, message } = error || {};

	if (error) {
		if (required && type === 'required') {
			ERROR_MESSAGE.push(error?.message || `${label} ${t('operators:error_message_1')}`);
		}
		if ((min || min === MIN_COUNT) && type === 'min') {
			ERROR_MESSAGE.push(
				`${label} ${t('operators:error_message_2')} ${min}`,
			);
		}
		if (max && type === 'max') {
			ERROR_MESSAGE.push(
				`${label} ${t('operators:error_message_3')} ${max}`,
			);
		}
		if (minLength && type === 'minLength') {
			ERROR_MESSAGE.push(
				`${label} ${t('operators:error_message_4')} ${minLength} ${t('operators:error_message_5')}`,
			);
		}
		if (maxLength && type === 'maxLength') {
			ERROR_MESSAGE.push(
				`${label} ${t('operators:error_message_6')} ${maxLength}`,
			);
		}
	}
	if (ERROR_MESSAGE.length) {
		return ERROR_MESSAGE.join(' ,');
	}
	return message;
};

export default getErrorMessage;
