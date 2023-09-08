const getControls = ({ t = () => {} }) => [
	{
		name        : 'stakeholder_id',
		label       : t('allocation:new_stakeholder_name_label'),
		placeholder : t('allocation:new_stakeholder_name_placeholder'),
		type        : 'asyncSelect',
		multiple    : true,
		initialCall : false,
		asyncKey    : 'partner_users',
		valueKey    : 'user_id',
		rules       : {
			required: true,
		},
		params: {
			filters: {
				partner_entity_types: ['cogoport'],
			},
		},
	},
	{
		name        : 'old_stakeholder_id',
		label       : t('allocation:old_stakeholder_name_label'),
		placeholder : t('allocation:old_stakeholder_name_placeholder'),
		type        : 'asyncSelect',
		multiple    : true,
		initialCall : false,
		asyncKey    : 'partner_users',
		valueKey    : 'user_id',
		rules       : {
			required: true,
		},
		params: {
			filters: {
				partner_entity_types: ['cogoport'],
			},
		},
	},
];

export default getControls;
