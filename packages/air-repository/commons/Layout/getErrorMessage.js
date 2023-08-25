const MIN_COUNT = 0;

const getErrorMessage = (props) => {
	const {
		error, rules, label, t,
	} = props;
	const ERROR_MESSAGE = [];

	if (error) {
		if (rules?.required && error.type === 'required') {
			ERROR_MESSAGE.push(error?.message || `${label} is Required`);
		}
		if ((rules?.min || rules?.min === MIN_COUNT) && error.type === 'min') {
			ERROR_MESSAGE.push(
				`${label} ${t('airRepository:cannot_be_less_than')} ${rules.min}`,
			);
		}
		if (rules?.max && error.type === 'max') {
			ERROR_MESSAGE.push(
				`${label} ${t('airRepository:cannot_be_greater_than')} ${rules.max}`,
			);
		}
		if (rules?.minLength && error.type === 'minLength') {
			ERROR_MESSAGE.push(
				`${label} ${t('airRepository:should_be')} ${rules.minLength} ${t('airRepository:characters_long')}`,
			);
		}
		if (rules?.maxLength && error.type === 'maxLength') {
			ERROR_MESSAGE.push(
				`${label} ${t('airRepository:should_be_less_than')} ${rules.maxLength}`,
			);
		}
	}
	if (ERROR_MESSAGE.length) {
		return ERROR_MESSAGE.join(' ,');
	}
	return error?.message;
};

export default getErrorMessage;
