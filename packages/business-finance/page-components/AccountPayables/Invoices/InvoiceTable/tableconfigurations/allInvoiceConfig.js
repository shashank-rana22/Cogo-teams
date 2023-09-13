export const ALL_INVOICE_CONFIG = {
	showHeader   : true,
	headerStyles : {
		borderRadius : '8px',
		background   : 'none',
		color        : '#000',
		fontSize     : '12px',
		fontWeight   : '600',
	},
	bodyStyles: {
		color     : ' #333333',
		fontSize  : '12px',
		borderTop : '1.8px solid #F68B21',
	},

	itemStyles: {
		padding      : '8px',
		paddingLeft  : '0px',
		borderBottom : '1px solid #F8F2E7',
	},
	fields: [
		{
			label     : 'Collection Party',
			key       : 'organizationName',
			func      : 'renderToolTip',
			maxLength : 36,
			span      : 1.8,
		},
		{
			label  : 'Invoice Number',
			key    : 'invoice_number',
			func   : 'renderFieldPair',
			span   : 1,
			topKey : {
				key         : 'invoiceNumber',
				type        : 'href',
				redirectKey : 'documentUrl',
			},
			lowerKey: {
				key  : 'invoiceType',
				type : 'tag',
			},
		},
		{
			label : 'Entity',
			key   : 'entityCode',
			span  : 0.6,
		},
		{
			label  : 'SID',
			key    : 'sid',
			func   : 'renderFieldPair',
			span   : 1.2,
			topKey : {
				key: 'jobNumber',
			},
			lowerKey: {
				key  : 'serviceType',
				type : 'serviceType',
			},
		},
		{
			label  : 'Invoice',
			key    : 'invoice',
			func   : 'renderFieldPair',
			span   : 1,
			topKey : {
				key         : 'invoiceAmount',
				type        : 'amount',
				currencyKey : 'currency',
			},
			lowerKey: {
				key  : 'paymentStatus',
				type : 'tag',
			},
		},
		{
			label       : 'TDS',
			key         : 'tdsAmount',
			func        : 'renderAmount',
			currencyKey : 'currency',
			span        : 1,
		},
		{
			label       : 'Payable',
			key         : 'payableAmount',
			span        : 1,
			func        : 'renderAmount',
			currencyKey : 'currency',
		},
		{
			label       : 'Paid',
			key         : 'paidAmount',
			span        : 1,
			func        : 'renderAmount',
			currencyKey : 'currency',
		},
		{
			label   : 'Invoice Dates',
			key     : 'invoice_dates',
			sorting : { name: 'dueDateSortType' },
			span    : 1.8,
			func    : 'renderInvoiceDates',
		},
		{
			label : 'Urgency',
			key   : 'urgencyTag',
			span  : 1,
			func  : 'renderUrgencyTag',
		},
		{
			label : 'Action',
			key   : 'action',
			span  : 0.6,
			func  : 'renderAction',
		},
	],
};
