import getEntityOptions from '../helpers/get-entity-options';

const controls = ({ t = () => {} }) => [
	{
		name        : 'role_ids',
		label       : t('allocation:by_agent_role_label'),
		placeholder : t('allocation:select_placeholder'),
		type        : 'asyncSelect',
		asyncKey    : 'partner_roles',
		initialCall : true,
		params      : {
			permissions_data_required : false,
			filters                   : {
				partner_entity_types : ['cogoport'],
				status               : true,
			},
		},
		caret       : true,
		multiple    : true,
		isClearable : true,
	},
	{
		name        : 'partner_id',
		label       : t('allocation:by_entity_label'),
		placeholder : t('allocation:select_placeholder'),
		type        : 'select',
		options     : getEntityOptions(),
		caret       : true,
		multiple    : true,
		isClearable : true,
	},
	{
		name        : 'channels',
		label       : t('allocation:by_channel_label'),
		placeholder : t('allocation:select_placeholder'),
		type        : 'select',
		options     : [
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
		caret       : true,
		multiple    : true,
		isClearable : true,
	},
	{
		name        : 'objective_type',
		label       : t('allocation:by_objective_type'),
		placeholder : t('allocation:select_placeholder'),
		type        : 'select',
		options     : [
			{
				label : t('allocation:company_options'),
				value : 'company',
			},
			{
				label : t('allocation:team_options'),
				value : 'team',
			},
		],
		caret       : true,
		multiple    : true,
		isClearable : true,
	},
];

export default controls;
