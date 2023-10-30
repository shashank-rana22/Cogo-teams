export const data = (incomeAccruedSum, incomeBookedSum) => [
	{
		id    : 'Income Accrued',
		label : 'Income Accrued',
		value : incomeAccruedSum,
		color : '#57C6D1',
	},
	{
		id    : 'Income Booked',
		label : 'Income Booked',
		value : incomeBookedSum,
		color : '#ADCC6A',
	},
];

export const dataExpense = (expenseAccruedSum, expenseBookedSum) => [
	{
		id    : 'Expense Accrued',
		label : 'Expense Accrued',
		value : expenseAccruedSum,
		color : '#57C6D1',
	},
	{
		id    : 'Expense Booked',
		label : 'Expense Booked',
		value : expenseBookedSum,
		color : '#ADCC6A',
	},
];

export const reportMonth = (shipmentViewData) => {
	const {
		zeroToFifteenDays = 0,
		sixteenToThirtyDays = 0,
		thirtyOneToSixtyDays = 0,
		sixtyOneToNinetyDays = 0,
	} = shipmentViewData;

	return [
		{ id: '1', days: '0 - 15 Days Left', shipmentId: zeroToFifteenDays },
		{ id: '2', days: '15 - 30 Days Left', shipmentId: sixteenToThirtyDays },
		{ id: '3', days: '1 - 2 Month Left', shipmentId: thirtyOneToSixtyDays },
		{ id: '4', days: '2 - 3 Month Left', shipmentId: sixtyOneToNinetyDays },
	];
};
