import ExpenseManagement from '../ExpenseManagement';
import MyPayslips from '../MyPayslips';

const tabs = [
	{
		name      : 'expensemanagement',
		title     : 'Expense Management',
		Component : <ExpenseManagement />,
	},
	{
		name      : 'payslips',
		title     : 'My Payslips',
		Component : <MyPayslips />,
	},
	// {
	// 	name      : 'people',
	// 	title     : 'People',
	// 	Component : <PeopleSalary />,
	// },
];

export default tabs;
