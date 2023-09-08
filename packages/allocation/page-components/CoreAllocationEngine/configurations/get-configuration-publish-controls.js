const controls = ({ t = () => {} }) => [
	{
		name  : 'active_date_range',
		label : t('allocation:active_date_range_label'),
		type  : 'dateRangePicker',
		rules : {
			required: t('allocation:active_date_range_rules_required'),
		},
		isPreviousDaysAllowed: false,
	},
];

export default controls;
