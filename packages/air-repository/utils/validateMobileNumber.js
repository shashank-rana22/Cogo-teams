const CHECK_MIN_PHONE_NO_LENGTH = 2;

const validateMobileNumber = (val = {}, t = () => {}) => {
	const keys = Object.keys(val || {});
	if (keys.length !== CHECK_MIN_PHONE_NO_LENGTH) {
		return 	t('airRepository:mobile_required_rule');
	}

	return true;
};
export default validateMobileNumber;
