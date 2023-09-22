const promotionCancellationConfig = [
	{
		key        : 'service_name',
		label      : 'Service Name',
		renderFunc : 'renderName',
		width      : '30%',
	},
	{
		key        : 'value',
		label      : 'Value',
		renderFunc : 'renderValue',
		width      : '20%',
	},
	{
		key   : 'usages_left',
		label : 'Usages Left',
		width : '20%',
	},
	{
		key        : 'is_active',
		label      : 'Status',
		renderFunc : 'renderStatus',
		width      : '30%',
	},
];

export default promotionCancellationConfig;
