import Manage from './Manage/index';
import DashboardPayroll from './PayrollDashboard/DashboardPayroll/index';
import Payroll from './PayrollDashboard/Payroll';
import PeopleSalary from './People';
import Transactions from './Transactions';

const tabs = [
	{
		name      : 'dashboard',
		title     : 'Dashboard',
		Component : <DashboardPayroll />,
	},
	{
		name      : 'payroll',
		title     : 'Payroll',
		Component : <Payroll />,
	},
	{
		name      : 'people',
		title     : 'People',
		Component : <PeopleSalary />,
	},
	{
		name      : 'transactions',
		title     : 'Transactions',
		Component : <Transactions />,
	},
	{
		name      : 'manage',
		title     : 'Manage',
		Component : <Manage />,
	},
];

export default tabs;
