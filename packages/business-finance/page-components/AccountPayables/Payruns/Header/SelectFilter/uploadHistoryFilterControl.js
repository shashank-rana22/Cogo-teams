export const UPLOAD_HISTORY_FILTERS = [
	{
		name        : 'status',
		type        : 'select',
		isClearable : 'true',
		placeholder : 'Status',
		options     : [
			{ label: 'Uploaded', value: 'uploaded' },
			{ label: 'Success', value: 'success' },
			{ label: 'Error', value: 'error' },
			{ label: 'In Progress', value: 'processing' },
		],
		span: 2,
	},
	{
		name                  : 'uploadedDate',
		type                  : 'singleDateRange',
		style                 : { width: '200px' },
		placeholder           : 'Uploaded Date',
		isPreviousDaysAllowed : true,
		isClearable           : true,
		span                  : 2.5,
	},
];
