import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const controls = [
	{
		name           : 'roles',
		label          : 'ROLES',
		placeholder    : 'Select Role',
		type           : 'select',
		isClearable    : true,
		options        : GLOBAL_CONSTANTS.options.role_options,
		defaultOptions : true,
	},
	{
		name           : 'joining_date',
		label          : 'Joining Date',
		type           : 'date-picker',
		showTimeSelect : true,
	},
];

export default controls;
