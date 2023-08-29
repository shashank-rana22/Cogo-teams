const getControls = ({ t = () => {} }) => [
	{
		name        : 'country_values',
		placeholder : t('athenaDashboard:country_values_placeholder'),
		width       : '15%',
		options     : [
			{ label: t('athenaDashboard:country_india_option_label'), value: 'INDIA' },
		],
	},
	{
		name        : 'shipment_type_values',
		placeholder : t('athenaDashboard:shipment_type_values_placeholder'),
		width       : '15%',
		options     : [
			{ label: t('athenaDashboard:trade_direction_import'), value: 'import' },
			{ label: t('athenaDashboard:trade_direction_export'), value: 'export' },
		],
	},
	{
		name        : 'shipment_mode_values',
		placeholder : t('athenaDashboard:shipment_mode_values_placeholder'),
		width       : '18%',
		options     : [
			{ label: t('athenaDashboard:shipment_mode_values_options_sea'), value: 'SEA' },
			{ label: t('athenaDashboard:shipment_mode_values_options_air'), value: 'AIR' },
		],
	},
	{
		name        : 'incoterm_values',
		placeholder : t('athenaDashboard:incoterm_values_placeholder'),
		width       : '12%',
		options     : [
			{ label: t('athenaDashboard:incoterm_values_options_cif'), value: 'CIF' },
			{ label: t('athenaDashboard:incoterm_values_options_cf'), value: 'CF' },
			{ label: t('athenaDashboard:incoterm_values_options_ci'), value: 'CI' },
			{ label: t('athenaDashboard:incoterm_values_options_fob'), value: 'FOB' },
		],

	},
];
export default getControls;
