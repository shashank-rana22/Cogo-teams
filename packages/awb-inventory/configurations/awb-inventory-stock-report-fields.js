export const AwbInventoryStockReportFields = {
	fields: [
		{
			key   : 'airline',
			label : 'Airline Name',
			span  : 1.6,
			func  : 'handleAirline',
		},
		{
			key   : 'airport',
			label : 'Region',
			span  : 1.8,
			func  : 'handleAirport',
		},
		{
			key   : 'total_stock',
			label : 'Total Stock',
			span  : 1,
			func  : 'handleTotalStock',
		},
		{
			key   : 'used_stock',
			label : 'Used Stock',
			span  : 1,
			func  : 'handleUsedStock',
		},
		{
			key   : 'unused_stock',
			label : 'Unused Stock',
			span  : 1,
			func  : 'handleUnusedStock',
		},
		{
			key   : 'cancelled_stock',
			label : 'Cancelled Stock',
			span  : 1,
			func  : 'handleCancelledStock',
		},
	],
};
