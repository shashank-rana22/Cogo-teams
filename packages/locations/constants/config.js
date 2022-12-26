const STATUS = [
	{
		label : 'Name',
		key   : 'name',
		flex  : 1,
	},
	{
		label : 'Type',
		key   : 'type',
		flex  : 1,
	}, {
		label : 'Status',
		key   : 'status',
		flex  : 1,
	}, {
		label : 'Created at',
		key   : 'created_at',
		type  : 'datetime',
		flex  : 1,
	},
];

const COUNTRY = [
	{
		label : 'Name',
		key   : 'name',
		flex  : 2,
	},
	{
		label : 'Type',
		key   : 'type',
		flex  : 2,
	},
	{
		label : 'Country Code',
		key   : 'country_code',
		flex  : 2,
	},
	{
		label : 'Created at',
		key   : 'created_at',
		type  : 'datetime',
		flex  : 2,
	},
];

const DEFAULT = [
	{
		label : 'Name',
		key   : 'name',
		flex  : 1,
	},
	{
		label : 'Type',
		key   : 'type',
		flex  : 1,
	},
	{
		label : 'Created at',
		key   : 'created_at',
		type  : 'datetime',
		flex  : 1,
	},
];

const getFieldsByTab = (tab) => {
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

	if (tabsWithCountry.includes(tab)) {
		return COUNTRY;
	}

	if (tabsWithStatus.includes(tab)) {
		return STATUS;
	}

	return DEFAULT;
};

export default getFieldsByTab;
