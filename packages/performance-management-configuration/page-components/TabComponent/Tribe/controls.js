const controls = [
	{
		name        : 'tribe_name',
		label       : 'Tribe Name',
		type        : 'input',
		placeholder : 'Enter Tribe name',

	},

	{
		name        : 'tribe_leader_id',
		type        : 'async-select',
		asyncKey    : 'partner_users_ids',
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
		type        : 'async-select',
		asyncKey    : 'partner_users_ids',
		label       : 'Squads',
		placeholder : 'Squads',
		multiple    : true,
		rules       : {
			required: 'Squads are required',
		},
		params: {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},

];

export default controls;
