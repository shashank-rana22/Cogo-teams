import getEntityOptions from '../helpers/get-entity-options';

const controls = [
	{
		name        : 'agent_role',
		label       : 'By Agent Role',
		placeholder : 'select',
		type        : 'asyncSelect',
		asyncKey    : 'partner_roles',
		initialCall : true,
		params      : {
			permissions_data_required : false,
			filters                   : {
				partner_entity_types : ['cogoport'],
				status               : 'active',
			},
		},
		caret       : true,
		multiple    : true,
		isClearable : true,
	},
	{
		name        : 'entity',
		label       : 'By Entity',
		placeholder : 'select',
		type        : 'select',
		options     : getEntityOptions(),
		caret       : true,
		multiple    : true,
		isClearable : true,
	},
	{
		name        : 'channel',
		label       : 'By Channel',
		placeholder : 'select',
		type        : 'select',
		options     : [
			{
				label : 'SME',
				value : 'sme',
			},
			{
				label : 'Enterprise',
				value : 'enterprise',
			},
			{
				label : 'CP',
				value : 'cp',
			},
		],
		caret       : true,
		multiple    : true,
		isClearable : true,
	},
	{
		name        : 'objective_type',
		label       : 'By Objective Type',
		placeholder : 'select',
		type        : 'select',
		options     : [
			{
				label : 'Company',
				value : 'company',
			},
			{
				label : 'Team',
				value : 'team',
			},
		],
		caret       : true,
		multiple    : true,
		isClearable : true,
	},
];

export default controls;
