export const PaymentReadyConfig = {
	showHeader : false,
	itemStyles : {
		border       : '1px solid #333333',
		margin       : '12px',
		borderRadius : '12px',
		fontSize     : '12px',
		fontWeight   : '500',
	},
	fields: [
		{
			key  : 'select',
			span : 0.5,
			func : 'renderRadio',
		},
		{
			key  : 'name',
			span : 3.5,
		},
		{
			key  : 'totalValue',
			span : 4,
			func : 'renderAmountWithCurrency',
		},
		{
			key  : 'invoiceCount',
			span : 3,
			func : 'renderInvoiceCount',
		},
		{
			key  : 'createdAt',
			span : 3,
			func : 'renderDateWithTime',
		},
		{
			key  : 'ribbon',
			func : 'renderRibbon',
			span : 1,
		},
	],
};
