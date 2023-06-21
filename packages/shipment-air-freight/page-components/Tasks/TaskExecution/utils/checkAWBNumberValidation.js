import { Toast } from '@cogoport/components';

const CHECK_DIGIT_INDEX = 12;
const AWB_VALIDATE_DIVISOR = 7;
const AWB_PREFIX_LENGTH = 3;
const checkAWBValidation = (value = '') => {
	const awbDigits = value.slice(AWB_PREFIX_LENGTH, CHECK_DIGIT_INDEX).replace(/-/g, '');
	const lastDigits = Number(value[CHECK_DIGIT_INDEX]);

	const remainder = Number(awbDigits) % AWB_VALIDATE_DIVISOR;

	if (value.trim() === '') {
		Toast.error('Cannot be Empty');
		return false;
	}
	if (!value.match(/[0-9]{3}-[0-9]{4}-[0-9]{4}$/)) {
		Toast.error('Enter AWB number in this format xxx-xxxx-xxxx');
		return false;
	}
	if (remainder !== lastDigits) {
		Toast.error(`Last Digit should be ${remainder}`);
		return false;
	}
	return true;
};
export default checkAWBValidation;
