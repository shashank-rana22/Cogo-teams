const MIN_COUNT = 0;

const getErrorMessage = (props) => {
	const { error, rules, label, t } = props;
	const ERROR_MESSAGE = [];

	const { required, min, max, minLength, maxLength } = rules || {};
	const { type, message } = error || {};

	if (error) {
		if (required && type === 'required') {
			ERROR_MESSAGE.push(error?.message || `${label} ${t('operators:error_message_is_required')}`);
		}
		if ((min || min === MIN_COUNT) && type === 'min') {
			ERROR_MESSAGE.push(
				`${label} ${t('operators:error_message_cannot_be_less_than')} ${min}`,
			);
		}
		if (max && type === 'max') {
			ERROR_MESSAGE.push(
				`${label} ${t('operators:error_message_cannot_be_greater_than')} ${max}`,
			);
		}
		if (minLength && type === 'minLength') {
			ERROR_MESSAGE.push(
				`${label} 
				${t('operators:error_message_should_be')} ${minLength} ${t('operators:error_message_character_long')}`,
			);
		}
		if (maxLength && type === 'maxLength') {
			ERROR_MESSAGE.push(
				`${label} ${t('operators:error_message_should_be_less_than')} ${maxLength}`,
			);
		}
	}
	if (ERROR_MESSAGE.length) {
		return ERROR_MESSAGE.join(' ,');
	}
	return message;
};

export default getErrorMessage;
