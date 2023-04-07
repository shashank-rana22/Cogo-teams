const tableFields = (priceRequest, countObj, tagDisplay) => [
	{
		label : `Services (${countObj.listCount})`,
		key   : 'name',
		span  : 4,
		func  : 'startCase',
	},
	{
		label  : '',
		key    : 'tags',
		span   : 2,
		func   : 'startCase',
		render : tagDisplay,
	},
	{
		label : 'Unit',
		key   : 'units',
		span  : 3,
		func  : 'startCase',
	},
	{
		label  : 'Price',
		key    : 'price',
		span   : 3,
		render : priceRequest,
	},
];

export default tableFields;
