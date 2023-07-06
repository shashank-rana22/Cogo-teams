import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const controls = [
	{
		name  : 'type',
		label : (
			<div>
				Select Objective Type
				<sup style={{ color: 'red' }}>*</sup>
			</div>
		),
		type        : 'select',
		placeholder : 'Objective Type',
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
		rules: {
			required: 'Objective Type is required',
		},
	},
	{
		name  : 'name',
		label : (
			<div>
				Objective Name
				<sup style={{ color: 'red' }}>*</sup>
			</div>
		),
		type        : 'text',
		placeholder : 'Objective Name',
		rules       : {
			required: 'Objective Name is required',
		},
	},
	{
		name        : 'partner_id',
		label       : 'Select Cogo Entity',
		type        : 'asyncSelect',
		placeholder : 'Cogo Entity',
		asyncKey    : 'partners',
		params      : {
			filters: {
				status : 'active',
				id     : Object.values(GLOBAL_CONSTANTS.country_entity_ids),
			},
		},
		initialCall : false,
		isClearable : true,
	},
	{
		name        : 'channel',
		label       : 'Select Channel',
		type        : 'multiSelect',
		placeholder : 'Channel',
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
		isClearable: true,
	},
	{
		name        : 'role_ids',
		label       : 'Select Cogoport Agent Roles',
		placeholder : 'Agent Roles',
		type        : 'asyncSelect',
		multiple    : true,
		asyncKey    : 'partner_roles',
		initialCall : false,
		params      : {
			permissions_data_required : false,
			filters                   : {
				partner_entity_types: ['cogoport'],
			},
		},
		isClearable: true,
	},
];

export default controls;
