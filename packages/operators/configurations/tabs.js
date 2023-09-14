export const tabs = (t = () => {}) => [
	{
		key   : 'airline',
		label : t('operators:header_tab_option_airline'),
	},
	{
		key   : 'shipping_line',
		label : t('operators:header_tab_option_shipping_line'),
	},
	{
		key   : 'others',
		label : t('operators:header_tab_option_others'),
	},
];
