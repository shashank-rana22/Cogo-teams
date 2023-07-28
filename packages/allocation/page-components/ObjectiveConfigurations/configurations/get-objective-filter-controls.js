import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getObjectiveFilterControls = () => {
	const controls = [
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
			name     : 'lead_objective_status',
			type     : 'chips',
			label    : 'Status',
			multiple : true,
			options  : [
				{
					label : 'Live',
					value : 'live',
				},
				{
					label : 'Verified',
					value : 'verified',
				},
				{
					label : 'Pending',
					value : 'verification_pending',
				},
				{
					label : 'Rejected',
					value : 'rejected',
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
			name    : 'partner_id',
			type    : 'select',
			size    : 'sm',
			label   : 'Entity',
			options : Object.values(GLOBAL_CONSTANTS.cogoport_entities).map(
				(entity) => ({ label: entity.name, value: entity.id }),
			),
			isClearable: true,
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
	];

	return controls;
};

export default getObjectiveFilterControls;
