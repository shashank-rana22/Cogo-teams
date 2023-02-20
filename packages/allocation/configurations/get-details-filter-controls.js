const controls = [
	{
		name        : 'stakeholder_id',
		label       : 'New Stakeholder Name',
		placeholder : 'Select New StakeHolder',
		type        : 'asyncSelect',
		multiple    : true,
		initialCall : false,
		asyncKey    : 'partner_users',
		valueKey    : 'user_id',
		rules       : {
			required: true,
		},
		params: {
			filters: {
				partner_entity_types: ['cogoport'],
			},
		},
	},
	{
		name        : 'old_stakeholder_id',
		label       : 'Old Stakeholder Name',
		placeholder : 'Select Old StakeHolder',
		type        : 'asyncSelect',
		multiple    : true,
		initialCall : false,
		asyncKey    : 'partner_users',
		valueKey    : 'user_id',
		rules       : {
			required: true,
		},
		params: {
			filters: {
				partner_entity_types: ['cogoport'],
			},
		},
	},
];

export default controls;
