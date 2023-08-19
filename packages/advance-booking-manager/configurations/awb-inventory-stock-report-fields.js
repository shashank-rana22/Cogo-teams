export const AwbInventoryStockReportFields = {
	fields: [
		{
			key   : 'airline',
			label : 'Airline Name',
			span  : 2,
			func  : 'handleAirline',
		},
		{
			key   : 'airport',
			label : 'Region',
			span  : 5.2,
			func  : 'handleAirport',
		},
		{
			key    : 'total_stock',
			label  : 'Total Stock',
			span   : 1.2,
			render : (singleItem) => singleItem?.totalStock,
		},
		{
			key    : 'used_stock',
			label  : 'Used Stock',
			span   : 1.2,
			render : (singleItem) => singleItem?.usedStock,
		},
		{
			key    : 'unused_stock',
			label  : 'Unused Stock',
			span   : 1.2,
			render : (singleItem) => singleItem?.unusedStock,
		},
		{
			key    : 'cancelled_stock',
			label  : 'Cancelled Stock',
			span   : 1.2,
			render : (singleItem) => singleItem?.cancelledStock,
		},
	],
};
