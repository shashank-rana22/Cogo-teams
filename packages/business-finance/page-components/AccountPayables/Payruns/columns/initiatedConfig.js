export const PAYRUN_AUDITED_PAYMENT_READY = {
	showHeader   : true,
	pageLimit    : 20,
	headerStyles : {
		borderRadius : '8px',
		background   : 'none',
		color        : 'black',
		marginLeft   : '8px',
		fontWeight   : 600,
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		borderTop  : '1.8px solid #F68B21',
	},
	fields: [
		{
			func : 'renderRadioToSelectPayrun',
			span : 0.4,
		},
		{
			label : 'PayRun Name',
			key   : 'name',
			span  : 1.8,
		},
		{
			label : 'Total Value',
			key   : 'totalValue',
			func  : 'renderFormatedAmount',
			span  : 1.4,
		},

		{
			label : 'No. Of Invoices',
			key   : 'invoiceCount',
			span  : 1.2,
		},

		{
			label : 'Date & Time',
			key   : 'createdAt',
			span  : 2,
		},
		{
			func : 'renderViewInvoice',
			span : 1,
		},
		{
			func : 'renderTrashPayrun',
			span : 1,
		},
		{
			func : 'renderRibbon',
			span : 1,
		},

	],
};