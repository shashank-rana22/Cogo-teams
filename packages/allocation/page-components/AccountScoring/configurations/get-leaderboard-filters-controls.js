import getDurationOptions from './duration-options';

const getControls = ({ t = () => {} }) => {
	const durationOptions = getDurationOptions({ t });

	return [
		{
			name        : 'warmth',
			label       : t('allocation:warmth'),
			type        : 'multiSelect',
			placeholder : t('allocation:warmth_placeholder'),
			options     : [
				{ label: t('allocation:ice_cold'), value: 'ice_cold' },
				{ label: t('allocation:cold'), value: 'cold' },
				{ label: t('allocation:warm'), value: 'warm' },
				{ label: t('allocation:hot'), value: 'hot' },
				{ label: t('allocation:flaming_hot'), value: 'flaming_hot' },
			],
			isClearable: true,
		},
		{
			name        : 'segment',
			label       : t('allocation:segment_single_entity_label'),
			type        : 'multiSelect',
			placeholder : t('allocation:segment_placeholder'),
			options     : [
				{ label: t('allocation:long_tail'), value: 'long_tail' },
				{ label: t('allocation:mid_size'), value: 'mid_size' },
				{ label: t('allocation:enterprise'), value: 'enterprise' },
				{ label: t('allocation:channel_partner'), value: 'channel_partner' },
			],
			isClearable: true,
		},
		{
			name        : 'service',
			label       : t('allocation:service_label'),
			type        : 'select',
			placeholder : t('allocation:service_placeholder'),
			options     : [
				{ value: 'organization', label: t('allocation:organization') },
				{ value: 'lead_organization', label: t('allocation:lead_organization') },
			],
			isClearable: true,
		},
		{
			name        : 'role_id',
			label       : t('allocation:role_id_label'),
			placeholder : t('allocation:role_id_placeholder'),
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_roles',
			initialCall : false,
			isClearable : true,
			disabled    : true,

		},
		{
			name        : 'user_id',
			label       : t('allocation:user_id_label'),
			placeholder : t('allocation:user_id_placeholder'),
			type        : 'asyncSelect',
			asyncKey    : 'partner_users',
			valueKey    : 'user_id',
			params      : {
				filters: {
					partner_entity_types : ['cogoport'],
					status               : 'active',
				},
			},
			multiple    : true,
			initialCall : true,
			isClearable : true,
			disabled    : true,
		},
		{
			name        : 'organization',
			label       : t('allocation:organization_label'),
			placeholder : t('allocation:organization_placeholder'),
			type        : 'asyncSelect',
			asyncKey    : 'organizations',
			params      : {
				sort_type           : 'desc',
				sort_by             : 'created_at',
				page_limit          : 50,
				agent_data_required : true,
				page                : 1,
			},
			isClearable: true,
		},
		{
			name        : 'duration',
			label       : t('allocation:duration_label'),
			placeholder : t('allocation:duration_placeholder'),
			type        : 'select',
			options     : durationOptions,
			isClearable : true,
		},
		{
			name                  : 'date_range',
			label                 : t('allocation:date_range_label'),
			type                  : 'dateRangePicker',
			isPreviousDaysAllowed : true,
			maxDate               : new Date(),
			disable               : true,
		},
	];
};
export default getControls;
