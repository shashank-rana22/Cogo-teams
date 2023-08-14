import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getAgentsFilterControls = () => {
	const controls = [
		{
			name        : 'objective_id',
			label       : 'Objective',
			placeholder : 'Select Objective',
			size        : 'sm',
			type        : 'asyncSelect',
			asyncKey    : 'allocation_objectives',
			multiple    : true,
			initialCall : true,
			isClearable : true,
			params      : {
				page_limit : 20,
				filters    : {
					status: 'active',
				},
			},
		},
		{
			name    : 'objective_type',
			type    : 'chips',
			label   : 'Type',
			options : [
				{
					label : 'Company',
					value : 'company',
				},
				{
					label : 'Team',
					value : 'team',
				},
			],
		},
		{
			name     : 'channels',
			type     : 'chips',
			label    : 'Channel',
			multiple : true,
			options  : [
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
		},
		{
			name        : 'role_ids',
			label       : 'Agent Roles',
			placeholder : 'Agent Roles',
			type        : 'asyncSelect',
			size        : 'sm',
			multiple    : true,
			asyncKey    : 'partner_roles',
			params      : {
				permissions_data_required : false,
				filters                   : {
					partner_entity_types : ['cogoport'],
					status               : 'active',
					stakeholder_id       : Object.values(GLOBAL_CONSTANTS.cogoport_entities).map((entity) => entity.id),
				},
			},
			isClearable: true,
		},
		{
			name        : 'user_id',
			label       : 'Agents',
			placeholder : 'Agents',
			type        : 'asyncSelect',
			size        : 'sm',
			asyncKey    : 'partner_users',
			valueKey    : 'user_id',
			multiple    : true,
			params      : {
				page_limit : 20,
				filters    : {
					status               : 'active',
					partner_entity_types : ['cogoport'],
				},
			},
			initialCall : true,
			isClearable : true,
		},
		{
			name    : 'partner_id',
			type    : 'select',
			size    : 'sm',
			label   : 'Entity',
			options : Object.values(GLOBAL_CONSTANTS.cogoport_entities).map(
				(entity) => ({ label: entity.name, value: entity.id }),
			),
			isClearable: true,
		},
	];

	return controls;
};

export default getAgentsFilterControls;
