export const PAYMENT_INITIATED_PAYRUN = {
	showHeader   : true,
	pageLimit    : 20,
	headerStyles : {
		borderRadius : '8px',
		background   : 'none',
		color        : 'black',
		marginLeft   : '8px',
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		borderTop  : '1.8px solid #F68B21',
	},
	fields: [
		{
			label : 'PayRun Name',
			key   : 'name',
			span  : 2,
		},
		{
			key   : 'bankName',
			label : 'Bank Name',
			span  : 2,
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
			span  : 1.4,
		},
		{
			func : 'renderViewInvoice',
			span : 1.4,
		},
		{
			func : 'renderPaymentInitiatedPayrunDownload',
			span : 0.5,
		},
		{
			func : 'renderTrashPayrun',
			span : 0.5,
		},
		{
			func : 'renderRibbon',
			span : 1,
		},

	],
};
