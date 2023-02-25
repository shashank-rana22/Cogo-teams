export const DEFAULT_PILLS_ITEMS = [
	{
		label : 'Introductory',
		value : 'introductory',
	},
	{
		label : 'Sales',
		value : 'sales',
	},
	{
		label : 'Rate enquiry',
		value : 'rate_enquiry',
	},
	{
		label : 'Other',
		value : 'other',
	},
	{
		label : 'Payment recovery',
		value : 'payment_recovery',
	},
];

export const NumberHide = (user_number = '') => {
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
