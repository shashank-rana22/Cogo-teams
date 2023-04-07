export const PaymentReadyConfig = {
	showHeader : false,
	itemStyles : {
		border       : '1px solid #333333',
		margin       : '12px',
		borderRadius : '12px',
	},
	fields: [
		{
			key  : 'select',
			span : 0.5,
			func : 'renderRadio',
		},
		{
			key  : 'payrunName',
			span : 4,
		},
		{
			key  : 'amount',
			span : 2,
			// func : 'renderAmountWithCurrency',
		},
		{
			key  : 'count',
			span : 2,
			// func : 'renderNoOfInvoices',
		},
		{
			key  : 'date',
			span : 3,
			// func : 'renderDateWithTime',
		},
	],
};
