const controls = ({ t = () => {} }) => ([
	{
		name        : 'rejection_reasons',
		type        : 'asyncSelect',
		label       : t('allocation:rejection_reasons_label'),
		placeholder : t('allocation:rejection_reasons_placeholder'),
		asyncKey    : 'allocation_rejection_type',
		multiple    : true,
		isClearable : true,
		rules       : { required: t('allocation:rejection_reasons_rules_required') },
	},
]);

export default controls;
