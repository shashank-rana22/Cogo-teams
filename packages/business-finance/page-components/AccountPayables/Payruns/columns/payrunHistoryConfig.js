export const payrunHistoryConfig = {
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
			key    : 'organizationName',
			label  : 'Name',
			span   : 1.4,
			func   : 'renderTooltip',
			styles : { marginLeft: '-8px' },
		},
		{
			label  : 'Invoice Number',
			topKey : {
				key         : 'billNumber',
				type        : 'href',
				redirectKey : 'billDocumentUrl',
			},

			lowerKey: {
				key  : 'billType',
				type : 'tag',
			},
			func : 'renderFieldPair',
			span : 1.4,
		},

		{
			label  : 'SID',
			topKey : {
				key: 'jobNumber',
			},
			lowerKey: {
				key  : 'serviceType',
				type : 'serviceType',
			},
			func : 'renderFieldPair',
			span : 1,
		},

		{
			label  : 'Invoice Amount',
			topKey : {
				key         : 'amount',
				type        : 'amount',
				currencyKey : 'currency',
			},
			func : 'renderFieldPair',
			span : 1.2,
		},
		{
			key         : 'tdsAmount',
			func        : 'renderAmount',
			currencyKey : 'currency',
			label       : 'TDS',
			span        : 1,
		},
		{
			key         : 'payableAmount',
			func        : 'renderAmount',
			label       : 'Payable',
			currencyKey : 'currency',
			span        : 1,
		},
		{
			key         : 'paidAmount',
			func        : 'renderAmount',
			currencyKey : 'currency',
			label       : 'Paid',
			span        : 1,
		},
		{
			key   : 'bankDetail',
			label : 'Bank Details',
			func  : 'renderBankDetails',
			span  : 2,
		},
		{
			key     : 'dueDate',
			type    : 'text',
			label   : 'Due Date',
			span    : 1.2,
			sorting : { name: 'dueDateSortType' },
		},
		{
			key     : 'createdAt',
			type    : 'text',
			label   : 'Created At',
			span    : 1.2,
			sorting : { name: 'createdAtSortType' },
		},
		{
			key  : 'invoiceDetails',
			func : 'renderInvoiceTimeLine',
			span : 0.6,
		},
	],
};
