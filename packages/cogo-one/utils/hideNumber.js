const hideNumber = (user_number = '') => {
	const firstNum = user_number.split('');
	const [firstNumber, secondNumber] = firstNum || [];
	const [secondLastNum, lastNum] = firstNum.slice(-2) || [];
	const mobileNumber = firstNumber
		+ secondNumber
		+ 'X'.repeat(user_number.length - 4)
		+ secondLastNum
		+ lastNum;
	return mobileNumber;
};

export default hideNumber;
