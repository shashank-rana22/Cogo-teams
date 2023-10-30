const getDetails = ({ t = () => {} }) => [
	{
		key   : 'type',
		label : t('locations:list_type_label'),
	},
	{
		key   : 'name',
		label : t('locations:list_name_label'),
	},
	{
		key   : 'display_name',
		label : t('locations:list_display_name_label'),
	},
	{
		key   : 'latitude',
		label : t('locations:list_latitiude_label'),
	},
	{
		key   : 'longitude',
		label : t('locations:list_longitude_label'),
	},
	{
		key   : 'postal_code',
		label : t('locations:list_postal_code_label'),
	},
	{
		key   : 'site_code',
		label : t('locations:list_site_code_label'),
	},
	{
		key   : 'port_code',
		label : t('locations:list_port_code_label'),
	},
	{
		key   : 'inttra_code',
		label : t('locations:list_inttra_code_label'),
	},
	{
		key   : 'currency_code',
		label : t('locations:list_currency_code_label'),
	},
	{
		key   : 'country_code',
		label : t('locations:list_country_code_label'),
	},
	{
		key   : 'mobile_country_code',
		label : t('locations:list_mobile_country_code_label'),
	},
	{
		key   : 'address',
		label : t('locations:list_address_label'),
	},
	{
		key   : 'status',
		label : t('locations:list_status_label'),
	},
	{
		key   : 'created_at',
		label : t('locations:list_created_at_label'),
		type  : 'date',
	},
];

export default getDetails;
