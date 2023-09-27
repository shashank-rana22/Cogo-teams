const getDiscountConfig = () => [
	{
		key        : 'service_name',
		label      : 'Service Name',
		renderFunc : 'renderName',
		width      : '22%',
	},
	{
		key        : 'config_type',
		label      : 'type',
		renderFunc : 'renderName',
		width      : '22%',

	},
	{
		key        : 'unit',
		label      : 'Unit',
		renderFunc : 'renderName',
	},
	{
		key   : 'value',
		label : 'Value',
	},
	{
		key   : 'usage_count',
		label : 'Usage Count',
	},
	{
		key        : 'editor',
		label      : '',
		renderFunc : 'renderEdit',
		width      : '5%',
	},
];

export default getDiscountConfig;
