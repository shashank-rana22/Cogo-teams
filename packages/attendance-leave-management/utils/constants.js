export const ATTENDANCE_CONSTANT = [
	{
		label    : 'Present',
		key      : 'present_days',
		colorDot : 'present_color',
	},
	{
		label    : 'Absent',
		key      : 'absent',
		colorDot : 'absent_color',
	},
	{
		label    : 'Leaves',
		key      : 'leaves',
		colorDot : 'leave_color',
	},
	{
		label    : 'Week Off/Holiday',
		key      : 'week_off',
		colorDot : 'holiday_color',
	},
	{
		label    : 'Invalid',
		key      : 'invalid',
		colorDot : 'invalid_color',
	},
];

export const ATTENDANCE_LOGS_STATUS_MAPPING = {
	present: {
		label     : 'Present',
		className : 'present_color',
	},
	absent: {
		label     : 'Absent',
		className : 'absent_color',
	},
	weekly_off: {
		label     : 'Weekly Off',
		className : 'weekly_off_color',
	},
	invalid: {
		label     : 'Invalid',
		className : 'invalid_color',
	},
	holiday: {
		label     : 'Holiday',
		className : 'present_color',
	},
	sick_leave: {
		label     : 'SL',
		className : 'present_color',
	},
	privilege_leave: {
		label     : 'PL',
		className : 'present_color',
	},
	casual_leave: {
		label     : 'CL',
		className : 'present_color',
	},
	half_day_sick_leave: {
		label     : 'HDSL',
		className : 'present_color',
	},
	half_day_privilege_leave: {
		label     : 'HDPL',
		className : 'present_color',
	},
	half_day_casual_leave: {
		label     : 'HDCL',
		className : 'present_color',
	},
	leave_without_pay: {
		label     : 'LWP',
		className : 'absent_color',
	},
	half_day_absent_sick_leave: {
		label     : 'HDASL',
		className : 'absent_color',
	},
	half_day_absent_privilege_leave: {
		label     : 'HDAPL',
		className : 'absent_color',
	},
	half_day_absent_casual_leave: {
		label     : 'HDACL',
		className : 'absent_color',
	},
	half_day_absent: {
		label     : 'HDA',
		className : 'hda',
	},
};

export const ATTENDANCE_STATS_MAPPING = [
	{
		key       : 'present_days',
		className : 'present_color',
	},
	{
		key       : 'absent',
		className : 'absent_color',
	},
	{
		key       : 'leaves',
		className : 'leave_color',
	},
	{
		key       : 'week_off',
		className : 'holiday_color',
	},
	{
		key       : 'invalid',
		className : 'invalid_color',
	},
	{
		key       : 'remaining_days',
		className : 'remaining_days',
	},
];

export const MONTHLY_SUMMARY_CONFIGS = [
	{
		label : 'Days Present',
		key   : 'day_present',
	},
	{
		label : 'Days Absent',
		key   : 'days_absent',
	},
	{
		label : 'Leave Taken',
		key   : 'leave_taken',
	},
	{
		label : 'Weekly Off',
		key   : 'weekly_off',
	},
	{
		label : 'Holiday',
		key   : 'holiday',
	},
	{
		label : 'Invalid Records',
		key   : 'invalid_records',
	},
	{
		label   : 'Total Hours',
		key     : 'total_hrs',
		showHrs : true,
	},
	{
		label     : 'Total Deviation',
		key       : 'total_deviation',
		showHrs   : true,
		showColor : true,
	},
];

export const EMPLOYEE_LIST_CONTROLS = {
	designation: {
		name        : 'designation',
		label       : 'Select Designation',
		placeholder : 'Search Designation',
		asyncKey    : 'list_employees',
		params      : {
			filters                       : { status: 'active' },
			page_limit                    : 100,
			required_keys                 : ['designation'],
			service_objects_data_required : false,
			mappings_data_required        : true,
		},
		isClearable : true,
		labelKey    : 'designation',
		valueKey    : 'designation',
		initialCall : true,
		multiple    : true,
	},
	location: {
		name        : 'location_id',
		label       : 'Select Location',
		placeholder : 'Search Location',
		asyncKey    : 'list_company_locations',
		isClearable : true,
		initialCall : true,
		multiple    : true,
	},
};

export const GREEN_STATUS = ['present', 'holiday', 'sick_leave', 'privilege_leave', 'casual_leave',
	'half_day_sick_leave', 'half_day_privilege_leave', 'half_day_casual_leave'];

export const INVALID_STATUS = ['invalid'];

export const HALF_DAY_STATUS = ['half_day_absent', 'half_day_absent_sick_leave',
	'half_day_absent_privilege_leave', 'half_day_absent_casual_leave'];

export const WEEKLY_OFF = ['weekly_off'];

export const RED_DOT = ['absent', 'half_day_absent', 'leave_without_pay', 'half_day_absent_sick_leave',
	'half_day_absent_privilege_leave', 'half_day_absent_casual_leave'];

export const SEPARATOR_CONDITION = ['half_day_absent_sick_leave', 'half_day_absent_privilege_leave',
	'half_day_absent_casual_leave', 'half_day_absent'];

export const IDCARDOPTIONS = [
	{ label: 'Collected', value: 'collected' }, { label: 'Not Collected', value: 'notcollected' }];
export const ACCESSCARDOPTIONS = [
	{ label: 'Collected', value: 'collected' },
	{ label: 'Not Collected', value: 'notcollected' }];
export const COMPANYASSETS = [
	{ label: 'Collected', value: 'collected' },
	{ label: 'Not Collected', value: 'notcollected' },
	{ label: 'Not Allocated', value: 'notallocated' }];

export const FNFPARTICULARDATA = [
	{
		label : 'Bonus',
		value : 'Bonus',
	},
	{
		label : 'Loan',
		value : 'Loan',
	}, {
		label : 'Gift',
		value : 'Gift',
	},
];

export const REASONSTOLEAVE = [
	{ label: 'Termination', value: 'Termination' },
	{ label: 'Termination - Fraud', value: 'Termination - Fraud' },
	{ label: 'Absconding', value: 'Absconding' },
	{ label: 'Security Reasons', value: 'Security Reasons' },
	{ label: 'Death', value: 'Death' },
	{ label: 'Harassment Case', value: 'Harassment Case' },
	{ label: 'Others', value: 'Others' },
];

export const REASONS_LIST = [
	'Lack of Career Growth and Development Opportunities',
	'Inadequate Compensation and Benefits',
	'Work-Life Balance Issues',
	'Company Culture and Values Misalignment',
	'Lack of Recognition and Appreciation',
	'Poor Communication',
	'Unchallenging tasks No job satisfaction',
	'Conflict and Workplace/ Team Issues',
	'Personal Reasons'];

export	const SERVICE_CHECKBOX_LIST = [
	{ label: 'Cloud Services', value: 'Cloud_Services' },
	{ label: 'Atlassian', value: 'Atlassian' },
	{ label: 'Figma', value: 'Figma' },
	{ label: 'Github', value: 'Github' },
];
