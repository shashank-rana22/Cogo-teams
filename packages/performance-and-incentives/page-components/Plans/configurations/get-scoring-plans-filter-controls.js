import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getScoringPlansFilterControls = () => {
	const controls = [
		{
			name    : 'status',
			label   : 'Status',
			type    : 'multiSelect',
			size    : 'sm',
			options : [
				{
					label : 'Active',
					value : 'active',
				},
				{
					label : 'Inactive',
					value : 'inactive',
				},
			],
			isClearable: true,
		},
		{
			name    : 'cogo_entity_id',
			label   : 'Entity',
			type    : 'multiSelect',
			size    : 'sm',
			options : Object.values(GLOBAL_CONSTANTS.cogoport_entities).map(
				(entity) => ({ label: entity.name, value: entity.id }),
			),
			isClearable: true,
		},
		{
			name    : 'channel',
			label   : 'Channel',
			type    : 'multiSelect',
			size    : 'sm',
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
			isClearable: true,
		},
		{
			name    : 'role_function',
			label   : 'Function',
			type    : 'multiSelect',
			size    : 'sm',
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
			isClearable: true,
		},
		{
			name     : 'role_ids',
			label    : 'Roles',
			type     : 'asyncSelect',
			size     : 'sm',
			multiple : true,
			asyncKey : 'partner_roles',
			params   : {
				permissions_data_required : false,
				filters                   : {
					partner_entity_types : ['cogoport'],
					status               : true,
					stakeholder_id       : Object.values(GLOBAL_CONSTANTS.cogoport_entities).map((entity) => entity.id),
				},
			},
			isClearable: true,
		},
	];

	return controls;
};

export default getScoringPlansFilterControls;
