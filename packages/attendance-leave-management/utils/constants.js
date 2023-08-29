/* eslint-disable no-magic-numbers */
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
	present                         : 'Present',
	absent                          : 'Absent',
	weekly_off                      : 'Weekly Off',
	invalid                         : 'Invalid',
	half_day_absent                 : 'HDA',
	holiday                         : 'Holiday',
	sick_leave                      : 'SL',
	privilege_leave                 : 'PL',
	casual_leave                    : 'CL',
	half_day_sick_leave             : 'HDSL',
	half_day_privilege_leave        : 'HDPL',
	half_day_casual_leave           : 'HDCL',
	leave_without_pay               : 'LWP',
	half_day_absent_sick_leave      : 'HDASL',
	half_day_absent_privilege_leave : 'HDAPL',
	half_day_absent_casual_leave    : 'HDACL',
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
