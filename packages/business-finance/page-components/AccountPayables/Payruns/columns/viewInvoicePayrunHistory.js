export const VIEW_INVOICE_PAYRUN_HISTORY_NORMAL_CONFIG = {
	showHeader   : true,
	pageLimit    : 20,
	headerStyles : {
		background : 'none',
		color      : '#333333',
		fontWeight : 600,
	},
	bodyStyles: {
		color      : '#333333',
		fontWeight : '400',
		fontSize   : '12px',
		borderTop  : '2px solid #F68B21',
	},
	fields: [
		{
			label  : 'Invoice Number',
			topKey : {
				key         : 'invoiceNumber',
				type        : 'href',
				redirectKey : 'documentUrl',
			},
			lowerKey: {
				key  : 'status',
				type : 'tag',
			},
			func : 'renderFieldPair',
			span : 1.8,
		},
		{
			label  : 'SID',
			topKey : {
				key         : 'sid',
				type        : 'href',
				redirectKey : 'shipmentId',
			},
			lowerKey: {
				key  : 'serviceType',
				type : 'serviceType',
			},
			func : 'renderFieldPair',
			span : 1.4,
		},
		{
			label : 'Amount',
			key   : 'invoiceAmount',
			func  : 'renderAmount',
			span  : 1.4,
		},
		{
			key   : 'tdsAmount',
			func  : 'renderAmount',
			label : 'TDS',
			span  : 1.2,
		},
		{
			key   : 'payableAmount',
			func  : 'renderAmount',
			label : 'Payable',
			span  : 1.5,
		},
		{
			key   : 'paymentStatus',
			label : 'Payment Status',
			func  : 'renderPaidPaymentStatus',
			span  : 1.4,
		},
		{
			key   : 'dueDate',
			label : 'Payment Due Date',
			span  : 1.5,
		},
		{
			key   : 'urgencyTag',
			label : 'Urgency',
			func  : 'renderUrgencyData',
			span  : 0.6,
		},
		{
			key  : 'invoiceDetails',
			func : 'renderInvoiceTimeLine',
			span : 0.5,
		},
	],
};
