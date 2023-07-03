import params from '../../../../common/getParams';

const controls = [
	{
		name        : 'squad_name',
		label       : 'Squad Name',
		type        : 'input',
		placeholder : 'Enter squad name',
	},

	{
		name        : 'squad_leader',
		label       : 'Squad leader',
		placeholder : 'Select Squad leader',
		type        : 'asyncSelect',
		asyncKey    : 'list_employees',
		valueKey    : 'id',
		rules       : {
			required: 'Squad leader is required',
		},
		params,
	},

	{
		name        : 'employee_ids',
		type        : 'asyncSelect',
		asyncKey    : 'list_employees',
		label       : 'Employees',
		placeholder : 'Employees',
		multiple    : true,
		rules       : {
			required: 'Employees are required',
		},
		params,
	},
];

export default controls;
