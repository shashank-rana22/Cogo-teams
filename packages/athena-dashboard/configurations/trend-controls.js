const getControls = ({ t = () => {} }) => [
	{
		name    : 'trade_direction',
		label   : t('athenaDashboard:trade_direction'),
		options : [
			{ value: 'import', label: t('athenaDashboard:trade_direction_import') },
			{ value: 'export', label: t('athenaDashboard:trade_direction_export') },
		],
	},
	{
		name    : 'hs_code',
		label   : t('athenaDashboard:hs_code_label'),
		options : [
			{ label: t('athenaDashboard:all_hs_code_option'), value: 'all' },
			{ label: t('athenaDashboard:select_below_hs_code_option'), value: 'select_codes_value' },
		],
	},
];
export default getControls;
