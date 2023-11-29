import ExpenseManagement from './ExpenseManagement';
import Manage from './Manage/index';
import DashboardPayroll from './PayrollDashboard/DashboardPayroll/index';
import Payroll from './PayrollDashboard/Payroll';
import Transactions from './Transactions';
import UploadFiles from './UploadFiles';

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
		name      : 'transactions',
		title     : 'Transactions',
		Component : <Transactions />,
	},
	{
		name      : 'manage',
		title     : 'Manage',
		Component : <Manage />,
	},
	{
		name      : 'expense_management',
		title     : 'Expense Management',
		Component : <ExpenseManagement />,
	},
	{
		name      : 'file_uploader',
		title     : 'File Uploader',
		Component : <UploadFiles />,
	},
];

export default tabs;
