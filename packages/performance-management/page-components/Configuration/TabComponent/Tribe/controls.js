import params from '../../../../common/getParams';

const controls = [
	{
		name        : 'tribe_name',
		label       : 'Tribe Name',
		type        : 'input',
		placeholder : 'Enter Tribe name',

	},

	{
		name        : 'tribe_leader',
		type        : 'asyncSelect',
		asyncKey    : 'list_employees',
		label       : 'Tribe leader',
		placeholder : 'Tribe leader',
		rules       : {
			required: 'Tribe leader is required',
		},
		params,
	},

	{
		name        : 'squad_ids',
		type        : 'asyncSelect',
		asyncKey    : 'list_squads',
		label       : 'Squads',
		placeholder : 'Squads',
		multiple    : true,
		rules       : {
			required: 'Squads are required',
		},
		params,
	},

];

export default controls;
