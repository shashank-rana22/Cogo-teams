const getControls = ({ t = () => {} }) => [
	{
		name        : 'mastery_name',
		label       : t('allocation:mastery_name_label'),
		placeholder : t('allocation:mastery_name_placeholder'),
		type        : 'text',
		rules       : {
			required: t('allocation:mastery_name_rules_required'),
		},
		isClearable: true,
	},
	{
		name        : 'badges',
		label       : t('allocation:badges_label'),
		placeholder : t('allocation:select_placeholder'),
		type        : 'asyncSelect',
		asyncKey    : 'badge_name',
		multiple    : true,
		initialCall : false,
		isClearable : true,
		params      : {
			filters: {
				status                       : 'active',
				expertise_configuration_type : 'event_configuration',
			},
		},
		rules: {
			required: t('allocation:badges_rules_required'),
		},
		styles: {
			width: '200px',
		},
	},
];

export default getControls;
