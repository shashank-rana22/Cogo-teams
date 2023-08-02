export const EMPLOYEE_STATUS_TABS = [
	{
		label : 'Confirmed',
		value : 'confirmed',
	},
	{
		label : 'Probation',
		value : 'probation',
	},
	{
		label : 'Notice',
		value : 'notice',
	},
];

export const FILTER_TAB = [
	{
		label : 'Filtered Data',
		value : 'filtered_data',
	},
];

export const SORT_OPTIONS = [
	{
		label : 'Employee name (A-Z)',
		value : 'name_asc',
	},
	{
		label : 'Employee name (Z-A)',
		value : 'name_desc',
	},
	{
		label : 'COGO-ID (Increasing)',
		value : 'employee_code_asc',
	},
	{
		label : 'COGO-ID (Decreasing)',
		value : 'employee_code_desc',
	},
	{
		label : 'Department (A-Z)',
		value : 'department_asc',
	},
	{
		label : 'Department (Z-A)',
		value : 'department_desc',
	},
];

export const HRBP_VIEW_DATA = [
	{
		label     : 'Employee Name',
		value     : 'name',
		startCase : true,
	},
	{
		label : 'COGO-ID',
		value : 'employee_code',
	},
	{
		label     : 'Email-ID',
		value     : 'cogoport_email',
		className : 'w_100',
	},
	{
		label     : 'Designation',
		value     : 'designation',
		startCase : true,
	},
	{
		label     : 'Department',
		value     : 'department',
		startCase : true,
	},
	{
		label     : 'Reporting Manager',
		value     : 'reporting_manager.name',
		startCase : true,
	},
	{
		label     : 'Reporting Location',
		value     : 'office_location',
		startCase : true,
	},
	{
		label     : 'Payroll Country',
		value     : 'payroll_country',
		startCase : true,
	},
	{
		label     : 'Status',
		value     : 'status',
		startCase : true,
	},
	{
		label     : 'Squad',
		value     : 'squad_name',
		startCase : true,
	},
	{
		label     : 'Tribe',
		value     : 'tribe_name',
		startCase : true,
	},
	{
		label     : 'Chapter',
		value     : 'chapter_name',
		startCase : true,
	},
	{
		label     : 'HRBP',
		value     : 'hrbp.name',
		startCase : true,
	},
	{
		label : 'LI',
		value : 'li',
	},
	{
		label : 'PI',
		value : 'pi',
	},
	{
		label : 'DOJ (Date of Joining)',
		value : 'date_of_joining',
	},
	{
		label : 'Resignation Date',
		value : 'resignation_date',
	},
	{
		label : 'LWP',
		value : 'employee_tags.lwp',
	},
	{
		label : 'Absconding',
		value : 'employee_tags.absconding',
	},
	{
		label : 'Cogo Freight',
		value : 'cfpl_joining_date',
	},
];

export const EMPLOYEE_STATUS = {
	confirmed: {
		label : 'Confirmed',
		color : '#B4F3BE',
	},
	probation: {
		label : 'Probation',
		color : '#FCEDBF',
	},
	separated: {
		label : 'Separated',
		color : '#F8AEA8',
	},
};

export const EMPLOYEE_STATUS_OPTIONS = [
	{
		label : 'Confirmed',
		value : 'confirmed',
	},
	{
		label : 'Probation',
		value : 'probation',
	},
	{
		label : 'Separated',
		value : 'separated',
	},
	{
		label : 'Notice',
		value : 'notice',
	},
];

export const PAGE_LIMIT_OPTIONS = [
	{
		label : 10,
		value : 10,
	},
	{
		label : 50,
		value : 50,
	},
	{
		label : 100,
		value : 100,
	},
	{
		label : 200,
		value : 200,
	},
];
