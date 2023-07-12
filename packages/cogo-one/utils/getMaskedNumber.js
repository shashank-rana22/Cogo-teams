const LAST_TWO_NUMBERS = -2;
const SHOW_MASK_NUMBER_TILL = 4;

const getMaskedNumber = (number = '') => {
	const firstNum = number?.split('');

	const [firstNumber, secondNumber] = firstNum || [];
	const [secondLastNum, lastNum] = firstNum?.slice(LAST_TWO_NUMBERS) || [];

	const mobileNumber = number
		? `${firstNumber}${secondNumber}X${'X'.repeat(
			number.length - SHOW_MASK_NUMBER_TILL,
		)}${secondLastNum}${lastNum}`
		: '-';
	return mobileNumber;
};

export default getMaskedNumber;
