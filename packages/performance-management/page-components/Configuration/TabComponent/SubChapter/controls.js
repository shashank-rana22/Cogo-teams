import params from '../../../../common/getParams';

const controls = [
	{
		name        : 'sub_chapter_name',
		label       : 'Sub-Chapter Name',
		type        : 'input',
		placeholder : 'Enter subchapter name',
	},

	{
		name        : 'sub_chapter_leader',
		label       : 'Sub-Chapter leader',
		placeholder : 'Select sub-chapter leader',
		type        : 'asyncSelect',
		initialCall : false,
		asyncKey    : 'list_employees',
		valueKey    : 'id',
		rules       : {
			required: 'Sub-chapter leader is required',
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
