const getStatusColumns = ({ t = () => {} }) => [
	{
		label : t('locations:list_name_label'),
		key   : 'name',
		flex  : 1,
	},
	{
		label : t('locations:list_type_label'),
		key   : 'type',
		flex  : 1,
	}, {
		label : t('locations:list_status_label'),
		key   : 'status',
		flex  : 1,
	}, {
		label : t('locations:list_created_at_label'),
		key   : 'created_at',
		type  : 'datetime',
		flex  : 1,
	},
];

const getCountryColumns = ({ t = () => {} }) => [
	{
		label : t('locations:list_name_label'),
		key   : 'name',
		flex  : 2,
	},
	{
		label : t('locations:list_type_label'),
		key   : 'type',
		flex  : 2,
	},
	{
		label : t('locations:list_country_code_label'),
		key   : 'country_code',
		flex  : 2,
	},
	{
		label : t('locations:list_created_at_label'),
		key   : 'created_at',
		type  : 'datetime',
		flex  : 2,
	},
];

const getDefaultColumns = ({ t = () => {} }) => [
	{
		label : t('locations:list_name_label'),
		key   : 'name',
		flex  : 1,
	},
	{
		label : t('locations:list_type_label'),
		key   : 'type',
		flex  : 1,
	},
	{
		label : t('locations:list_created_at_label'),
		key   : 'created_at',
		type  : 'datetime',
		flex  : 1,
	},
];

const getFieldsByTab = ({ type, t = () => {} }) => {
	const tabsWithCountry = [
		'country',
		'city',
		'seaport',
		'cfs',
		'yard',
		'warehouse',
		'railway_terminal',
	];
	const tabsWithStatus = ['continent', 'region'];

	const countryColumns = getCountryColumns({ t });
	const statusColumns = getStatusColumns({ t });
	const defaultColumns = getDefaultColumns({ t });

	if (tabsWithCountry.includes(type)) {
		return countryColumns;
	}

	if (tabsWithStatus.includes(type)) {
		return statusColumns;
	}

	return defaultColumns;
};

export default getFieldsByTab;
