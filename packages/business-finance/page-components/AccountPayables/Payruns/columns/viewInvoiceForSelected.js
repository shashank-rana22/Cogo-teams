export const VIEW_INVOICE_NORMAL_CONFIG = {
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
				key  : 'paymentStatus',
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
			span : 1.8,
		},
		{
			label : 'Amount',
			key   : 'invoiceAmount',
			func  : 'renderAmount',
			span  : 1.7,
		},
		{
			key   : 'tdsAmount',
			func  : 'renderAmount',
			label : 'TDS',
			span  : 1.7,
		},
		{
			key   : 'payableAmount',
			func  : 'renderAmount',
			label : 'Payable',
			span  : 1.5,
		},
		{
			key   : 'dueDate',
			label : 'Payment Due Date',
			span  : 1.5,
		},
		{
			key   : 'urgencyTag',
			label : 'Urgency',
			// func  : 'renderUrgencyData',
			span  : 1,
		},
		{
			key  : 'delete',
			span : 0.5,
			func : 'renderTrashInvoice',
		},
		{
			key  : 'invoiceDetails',
			func : 'renderInvoiceTimeLine',
			span : 0.5,
		},
	],
};
