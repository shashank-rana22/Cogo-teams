export const INVOICE_LIST_FILTERS = [
	{
		name        : 'migrated',
		placeholder : 'Migration',
		size        : 'sm',
		type        : 'select',
		caret       : true,
		isClearable : true,
		options     : [
			{ value: 'true', label: 'True' },
			{ value: 'false', label: 'False' },
		],
	},
	{
		name        : 'status',
		placeholder : 'Payment',
		size        : 'sm',
		type        : 'select',
		caret       : true,
		isClearable : true,
		options     : [

			{ value: 'paid', label: 'Paid' },
			{ value: 'unpaid', label: 'Unpaid' },
			{ value: 'partiallyPaid', label: 'Partially paid' },

		],
	},
	{
		name        : 'invoiceStatus',
		placeholder : 'Invoice',
		size        : 'sm',
		type        : 'select',
		caret       : true,
		isClearable : true,
		options     : [
			{ label: 'Draft', value: 'DRAFT' },
			{ label: 'Finance Accepted', value: 'FINANCE_ACCEPTED' },
			{ label: 'Irn Generated', value: 'IRN_GENERATED' },
			{ label: 'Irn Failed', value: 'IRN_FAILED' },
			{ label: 'Irn Cancelled', value: 'IRN_CANCELLED' },
			{ label: 'Posted to Sage', value: 'POSTED' },
			{ label: 'Post to Sage Failed', value: 'FAILED' },
			{ label: 'Requested', value: 'REQUESTED' },
		],
	},
];
