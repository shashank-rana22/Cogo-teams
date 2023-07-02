const filterControls = [
	{
		name        : 'docType',
		type        : 'select',
		span        : 1,
		placeholder : 'Document Type',
		isClearable : true,
		size        : 'sm',
		options     : [
			{ label: 'Invoice', value: 'INVOICE' },
			{ label: 'Credit Note', value: 'CREDIT_NOTE' },
		],
	},
	{
		name        : 'irnStatus',
		type        : 'select',
		span        : 1,
		placeholder : 'IRN Status',
		isClearable : true,
		size        : 'sm',
		options     : [{ value: 'true', label: 'Success' }, { value: 'false', label: 'Fail' }],
	},
];
export default filterControls;
