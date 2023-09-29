const tableColumns = [
	{
		Header   : 'NAME',
		accessor : (item) => item?.name,
		id       : 'role_name',
	},
	{
		Header   : 'AMOUNT ALOTTED',
		accessor : (item) => item?.total_budget,
		id       : 'total_budget',
	},
	{
		Header   : 'PROMO CODES GENERATED',
		accessor : (item) => item?.total_count,
		id       : 'total_count',
	},
	{
		Header   : 'AMOUNT UTILISED',
		accessor : (item) => item?.amount_utilised,
		id       : 'amount_utilised',
	},
	{
		Header   : 'SHIPMENTS',
		accessor : (item) => item?.shipment_stats,
		id       : 'shipment_stats',
	},
	{
		Header   : '',
		accessor : 'block',
		id       : 'block',
	},
];

export default tableColumns;
