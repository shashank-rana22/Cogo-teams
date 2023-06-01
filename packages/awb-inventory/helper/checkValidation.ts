const checkValidation = (value = '') => {
	const awbDigits = value.slice(3, 12).replace(/-/g, '');
	const lastDigits = Number(value[12]);

	const remainder = Number(awbDigits) % 7;

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
