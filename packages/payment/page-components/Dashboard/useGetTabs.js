import ExpenseManagement from '../ExpenseManagement';

const tabs = [
	{
		name      : 'expensemanagement',
		title     : 'Expense Management',
		Component : <ExpenseManagement />,
	},
	{
		name      : 'payslips',
		title     : 'My Payslips',
		Component : <div>Payslips</div>,
	},
	// {
	// 	name      : 'people',
	// 	title     : 'People',
	// 	Component : <PeopleSalary />,
	// },
];

export default tabs;
