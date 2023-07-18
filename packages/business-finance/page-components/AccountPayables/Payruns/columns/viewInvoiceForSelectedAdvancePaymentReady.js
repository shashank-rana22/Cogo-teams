export const VIEW_INVOICE_ADVANCE_PAYMENT_READY_CONFIG = {
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
			label : '',
			func  : 'renderCheckbox',
			span  : 0.4,
		},
		{
			key   : 'organizationName',
			label : 'Organization',
			span  : 2.2,
			// func  : 'renderAdvanceName',
		},
		{
			key   : 'advanceDocumentNo',
			label : 'Adv. Doc. No.',
			span  : 1.5,
		},
		{
			key   : 'incidentRefNo',
			label : 'Incident No.',
			span  : 1.5,
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
