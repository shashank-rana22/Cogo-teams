// export const getLeaveControls = (isHalfDay) => {

// };

export const LEAVE_CONTROLS = [
	{
		label       : 'Employee Name',
		name        : 'name',
		controlType : 'text',
		placeholder : 'Employee Name',
		rules       : {
			required: {
				value   : true,
				message : 'Name is required',
			},
		},
	},
	{
		name        : 'leave_type',
		label       : 'Leave Type',
		controlType : 'select',
		placeholder : 'Leave Type',
		options     : [
			{
				label : 'Privilege Leave',
				value : 'privilege_leave',
			},
			{
				label : 'Sick Leave',
				value : 'sick_leave',
			},
			{
				label : 'Leave Without Pay',
				value : 'leave_without_pay',
			},
			{
				label : 'Casual Leave',
				value : 'casual_leave',
			},
			{
				label : 'Marriage Leave',
				value : 'marriage_leave',
			},
			{
				label : 'Bereavement Leave',
				value : 'bereavement_leave',
			},
			{
				label : 'Paternity Leave',
				value : 'paternity_leave',
			},
		],
		rules: {
			required: {
				value   : true,
				message : 'LWP is required',
			},
		},
	},
	{
		label                 : 'Enter date of joining',
		name                  : 'date_of_joining',
		controlType           : 'date',
		placeholder           : 'Date of joining',
		isPreviousDaysAllowed : true,
		dateFormat            : 'dd-MM-yyyy',
		rules                 : {
			required: {
				value   : true,
				message : 'DOJ is required',
			},
		},
	},
];
