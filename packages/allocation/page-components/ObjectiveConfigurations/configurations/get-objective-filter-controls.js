import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getObjectiveFilterControls = ({ t = () => {} }) => {
	const controls = [
		{
			name    : 'objective_type',
			type    : 'chips',
			label   : t('allocation:type_short_label'),
			options : [
				{
					label : t('allocation:company_options'),
					value : 'company',
				},
				{
					label : t('allocation:team_options'),
					value : 'team',
				},
			],
		},
		{
			name     : 'lead_objective_status',
			type     : 'chips',
			label    : t('allocation:lead_objective_status'),
			multiple : true,
			options  : [
				{
					label : t('allocation:verified_option'),
					value : 'verified',
				},
				{
					label : t('allocation:pending_option'),
					value : 'verification_pending',
				},
				{
					label : t('allocation:rejected_option'),
					value : 'rejected',
				},
			],
		},
		{
			name     : 'channels',
			type     : 'chips',
			label    : t('allocation:channels_short_label'),
			multiple : true,
			options  : [
				{
					label : t('allocation:sme_options'),
					value : 'sme',
				},
				{
					label : t('allocation:enterprise'),
					value : 'enterprise',
				},
				{
					label : t('allocation:cp_options'),
					value : 'cp',
				},
			],
		},
		{
			name    : 'partner_id',
			type    : 'select',
			size    : 'sm',
			label   : t('allocation:entity_label'),
			options : Object.values(GLOBAL_CONSTANTS.cogoport_entities).map(
				(entity) => ({ label: entity.name, value: entity.id }),
			),
			isClearable: true,
		},
		{
			name        : 'role_ids',
			label       : t('allocation:agent_roles_placeholder'),
			placeholder : t('allocation:agent_roles_placeholder'),
			type        : 'asyncSelect',
			size        : 'sm',
			multiple    : true,
			asyncKey    : 'partner_roles',
			params      : {
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

export default getObjectiveFilterControls;
