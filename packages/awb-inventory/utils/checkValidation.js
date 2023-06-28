const REMAINDER_CHECK_DIGIT = 7;
const LAST_DIGIT_VALUE = 12;
const AWB_FIRST_THREE_DIGIT = 3;

const checkValidation = (value = '') => {
	const awbDigits = value.slice(AWB_FIRST_THREE_DIGIT, LAST_DIGIT_VALUE).replace(/-/g, '');
	const lastDigits = Number(value[LAST_DIGIT_VALUE]);

	const remainder = Number(awbDigits) % REMAINDER_CHECK_DIGIT;

	if (value.trim() === '') {
		return 'Cannot be Empty';
	}
	if (!value.match(/[0-9]{3}-[0-9]{4}-[0-9]{4}$/)) {
		return 'Enter AWB number in this format xxx-xxxx-xxxx';
	}
	if (remainder !== lastDigits) {
		return `Last Digit should be ${remainder}`;
	}
	return true;
};
export default checkValidation;
