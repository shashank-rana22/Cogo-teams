export const EMPLOYEE_STATUS = {
	confirmed: {
		label : 'Confirmed',
		color : '#B4F3BE',
	},
	pending: {
		label : 'Pending',
		color : '#fef199',
	},
};

export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const colors = [
	'#D6B300',
	'#BF291E',
	'#C26D1A',
	'#849E4C',
	'#6FA5AB',
	'#FEF199',
	'#F8AEA8',
	'#FBD1A6',
	'#DDEBC0',
	'#FDE74D',
	'#F37166',
	'#F9AE64',
	'#C4DC91',
	'#FCDC00',
	'#FDE74D',
	'#F37166',
	'#F9AE64',
	'#C4DC91',
	'#FCDC00',
	'#EE3425',
	'#F68B21',
	'#ABCD62',
	'#FCDC00',
];

export const data_map_payroll_card = [
	{ name: 'total_monthly_salary', label: 'Salary' },
	{ name: 'total_tds_deducted', label: 'Tax' },
	{ name: 'total_reimbursements', label: 'Reimbursements' },
	{ name: 'total_arrears_cleared', label: 'Arrears' },
	{ name: 'total_arrears_left', label: 'Arrears Left' },
	{ name: 'total_gifts', label: 'Gifts' },
	{ name: 'total_bonuses', label: 'Bonuses' },
	{ name: 'total_deductions', label: 'Deductions' },
];

export const CARDDATAPAYROLL = [
	{
		title    : 'total_net_payout',
		subtitle : 'Total Payroll',
	},
];

export const selectConfigurationsPeoplePage = [
	{
		name        : 'role_id',
		placeholder : 'Designation',
		asyncKey    : 'list_employee_roles',
		labelKey    : 'role_name',
		valueKey    : 'id',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		isClearable: true,
	},
	{
		name        : 'department_id',
		placeholder : 'Department',
		asyncKey    : 'list_employee_departments',
		isClearable : true,
		labelKey    : 'department_name',
		valueKey    : 'id',
		params      : {
			filters: {
				status: 'active',
			},
		},
	},
	{
		name        : 'reporting_location_id',
		placeholder : 'Location',
		asyncKey    : 'list_company_locations',
		params      : { filters: { status: 'active' } },
		labelKey    : 'display_name',
		valueKey    : 'id',
	},
];

export const PAYMENT_TYPE_OPTIONS = [
	{ label: 'Bonus', value: 'bonus' },
	{ label: 'Additional Bonus', value: 'additional_bonus' },
	{ label: 'Incentives', value: 'incentive' },
	{ label: 'Reimbursement', value: 'reimbursement' },
	{ label: 'Arrear', value: 'arrear' },
	{ label: 'Gift', value: 'gift' },
	{ label: 'Deduction', value: 'deduction' },
];

export const EDIT_MODEL_LABELS = [
	{
		title    : 'additions',
		total    : 'additions_sum',
		subTitle : 'Payments under additions are taxable ',
	},
	{
		title    : 'deductions',
		total    : 'deductions_sum',
		subTitle : 'Only arrears to be deducted',
	},
];

export const SELECTCONFIGURATIONSTRANSACTION = [
	{
		name        : 'employee_id',
		placeholder : 'Employee',
		asyncKey    : 'list_employees',

	},
	{
		name        : 'component_type',
		placeholder : 'Type',
		asyncKey    : 'list_transaction_type',

	},
];

export const STATUS_OPTIONS = [
	{ value: 'pending', label: 'pending' },
	{ value: 'approved', label: 'approved' },
	{ value: 'processed', label: 'processed' },
	{ value: 'paid', label: 'paid' },
	{ value: 'cancelled', label: 'cancelled' }];

export const PAYROLL_SETTINGS = [
	{
		name     : 'Payroll Setup',
		subTopic : 'View and manage all payroll and structures',
		key      : 'payroll_setup',
	},
	{
		name     : 'Tax Setup',
		subTopic : 'Add or Edit Policies assigned to employees',
		key      : 'tax_setup',
	},
	{
		name     : 'Irregular Payments',
		subTopic : 'Payments which are not part of regular payroll',
		key      : 'irregular_payments',
	},
	{
		name     : 'Bonuses',
		subTopic : 'Add or Edit the types of leaves',
		key      : 'bonuses',
	},
];

export const tabData = [
	{ name: 'paid', title: 'Completed' },
	{ name: 'approved', title: 'Approved' },
	{ name: 'pending', title: 'Pending' },
	{ name: 'cancelled', title: 'Cancelled' },
	{ name: 'failed', title: 'Failed' },
];
