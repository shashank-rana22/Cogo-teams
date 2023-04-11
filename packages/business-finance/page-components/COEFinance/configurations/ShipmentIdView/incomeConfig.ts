export const incomeConfig = {
	showHeader   : true,
	headerStyles : {
		background: '#333',
	},

	fields: [
		{
			key   : 'invoiceNumber',
			label : 'Invoice No.',
			span  : 2.9,
			func  : 'renderInvoiceNumber',
		},
		{
			label : 'Customer Name',
			key   : 'businessName',
			func  : 'renderName',
			span  : 2.3,
		},
		{
			label : 'Invoice Amount',
			key   : 'grandTotal',
			func  : 'renderAmount',
			span  : 2,
		},
		{
			label : 'Service Ops 2',
			key   : 'createdByName',
			func  : 'renderName',
			span  : 1.9,
		},
		{
			label : 'Invoice Date',
			key   : 'invoiceDate',
			func  : 'renderDates',
			span  : 2,
		},
		{
			label : 'Payment Due Date',
			key   : 'dueDate',
			func  : 'renderDates',
			span  : 2.2,
		},
		{
			label : 'Last Modified Date',
			key   : 'updatedAt',
			func  : 'renderDates',
			span  : 2.2,
		},
		{
			label : 'Status',
			key   : 'status',
			span  : 2.3,
			func  : 'renderStatus',
		},
		{
			label : 'Remarks',
			key   : 'remarks',
			func  : 'renderRemarks',
			span  : 1,
		},
		{
			span : 2,
			func : 'renderInvoices',
		},
	],
};
