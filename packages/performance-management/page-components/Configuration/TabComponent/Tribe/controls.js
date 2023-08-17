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
		params: {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
	},

	{
		name        : 'squad_ids',
		type        : 'asyncSelect',
		asyncKey    : 'list_squads',
		label       : 'Squads',
		placeholder : 'Squads',
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit              : 100,
			exclude_squads_assigned : true,
		},
		multiple : true,
		rules    : {
			required: 'Squads are required',
		},
	},

];

export default controls;
