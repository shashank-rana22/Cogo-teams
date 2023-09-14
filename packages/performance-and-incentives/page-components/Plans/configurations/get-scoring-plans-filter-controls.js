import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getScoringPlansFilterControls = () => {
	const controls = [
		{
			name    : 'status',
			label   : 'Status',
			type    : 'multiSelect',
			options : [
				{
					label : 'Active',
					value : 'active',
				},
				{
					label : 'Draft',
					value : 'draft',
				},
				{
					label : 'Inactive',
					value : 'inactive',
				},
			],
		},
		{
			name    : 'cogo_entity_id',
			label   : 'Entity',
			type    : 'multiSelect',
			options : Object.values(GLOBAL_CONSTANTS.cogoport_entities).map(
				(entity) => ({ label: entity.name, value: entity.id }),
			),
		},
		{
			name    : 'channel',
			label   : 'Channel',
			type    : 'multiSelect',
			options : [
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
			name    : 'role_function',
			label   : 'Function',
			type    : 'multiSelect',
			options : [
				{
					label : 'Sales',
					value : 'sales',
				},
				{
					label : 'Supply',
					value : 'supply',
				},
				{
					label : 'Operations',
					value : 'operations',
				},
				{
					label : 'Finance',
					value : 'finance',
				},
				{
					label : 'Training',
					value : 'training',
				},
				{
					label : 'HR',
					value : 'hr',
				},
				{
					label : 'External',
					value : 'external',
				},
			],
		},
		{
			name        : 'role_ids',
			label       : 'Roles',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_roles',
			initialCall : true,
			params      : {
				permissions_data_required : false,
				filters                   : {
					partner_entity_types : ['cogoport'],
					status               : true,
					stakeholder_id       : Object.values(GLOBAL_CONSTANTS.cogoport_entities).map((entity) => entity.id),
				},
			},
		},
	];

	return controls;
};

export default getScoringPlansFilterControls;
