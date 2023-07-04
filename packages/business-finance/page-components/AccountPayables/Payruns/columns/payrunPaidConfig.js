export const payrunPaidConfig = {
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
				key         : 'objectNumber',
				type        : 'href',
				redirectKey : 'billPdfUrl',
			},

			lowerKey: {
				key  : 'billType',
				type : 'tag',
			},
			func : 'renderFieldPair',
			span : 1.4,
		},
		{
			label : 'Job Type',
			key   : 'jobType',
			span  : 1.3,
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
			label : 'Supplier Name',
			key   : 'organizationName',
			func  : 'renderAdvanceName',
			span  : 2.2,
		},
		{
			label  : 'Invoice Amount',
			topKey : {
				key         : 'grandTotal',
				type        : 'amount',
				currencyKey : 'currency',
			},
			func : 'renderFieldPair',
			span : 1.2,
		},
		{
			key         : 'totalPaidTds',
			func        : 'renderAmount',
			currencyKey : 'currency',
			label       : 'TDS Amount',
			span        : 1,
		},
		{
			key         : 'totalPaidAmount',
			func        : 'renderAmount',
			currencyKey : 'currency',
			label       : 'Paid Amount',
			span        : 1,
		},
		{
			key   : 'billPaymentStatus',
			label : 'Status ',
			span  : 0.8,
			// func  : 'renderStatus',
		},
		{
			func : 'renderDropDownData',
			span : 0.7,
		},
		{
			key  : 'invoiceDetails',
			func : 'renderInvoiceTimeLine',
			span : 0.6,
		},

	],
};
