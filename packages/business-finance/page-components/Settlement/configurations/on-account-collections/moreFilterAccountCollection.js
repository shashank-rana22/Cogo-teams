export const MORE_FILTERS_AMOUNT_COLLECTION = [
	{
		name        : 'paymentDocumentStatus',
		type        : 'select',
		theme       : 'admin',
		isClearable : true,
		placeholder : 'Select Status',
		options     : [
			{ label: 'APPROVED', value: 'APPROVED' },
			{ label: 'POSTED', value: 'POSTED' },
			{ label: 'POSTING FAILED', value: 'POSTING_FAILED' },
			{ label: 'FINAL POSTED', value: 'FINAL_POSTED' },
			{ label: 'DELETED', value: 'DELETED' },
			{ label: 'UPLOADED', value: 'CREATED' },
		],
	},
	{
		name        : 'docType',
		type        : 'select',
		theme       : 'admin',
		isClearable : true,
		placeholder : 'Select DOC Type',
		options     : [
			{ label: 'TDS', value: 'TDS' },
			{ label: 'PAYMENT', value: 'PAYMENT' },
			{ label: 'RECEIPT', value: 'RECEIPT' },
		],
	},
];
