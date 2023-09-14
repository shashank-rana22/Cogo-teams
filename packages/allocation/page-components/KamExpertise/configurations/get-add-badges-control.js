const getControls = ({ t = () => {} }) => [
	{
		name        : 'badge',
		label       : t('allocation:badge_name_label'),
		placeholder : t('allocation:badge_name_placeholder'),
		type        : 'text',
		rules       : {
			required: t('allocation:badge_name_rules_required'),
		},
		isClearable: true,
	},
	{
		name        : 'condition',
		label       : t('allocation:event_label'),
		placeholder : t('allocation:event_placeholder'),
		type        : 'asyncSelect',
		asyncKey    : 'expertise_configuration',
		multiple    : true,
		initialCall : false,
		rules       : {
			required: t('allocation:event_rules_required'),
		},
	},
	{
		name        : 'description',
		label       : t('allocation:description_label'),
		placeholder : t('allocation:enter_description_placeholder'),
		type        : 'text',
		rules       : {
			required: t('allocation:description_input_rules_required'),
		},
		isClearable: true,
	},
];

export default getControls;
