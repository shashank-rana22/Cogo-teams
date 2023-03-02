export const expenseConfig = {
	showHeader   : true,
	headerStyles : {
		background: '#333',
	},
	fields: [
		{
			key   : 'billNumber',
			label : 'Invoice No.',
			span  : 2.9,
			func  : 'renderInvoiceNumber',
		},
		{
			label : 'Supplier Name',
			key   : 'organizationName',
			func  : 'renderName',
			span  : 2,
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
			span  : 2,
		},

		{
			label : 'Invoice Date',
			key   : 'billDate',
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
			label : 'Last Modified At',
			key   : 'createdDate',
			func  : 'renderDates',
			span  : 2,
		},
		{
			label : 'Status',
			key   : 'status',
			span  : 2.5,
			func  : 'renderStatus',
		},
		{
			label : 'Remarks',
			key   : 'remarks',
			func  : 'renderRemarks',
			span  : 1,
		},
		{
			span : 1.9,
			func : 'renderInvoices',
		},
	],
};
