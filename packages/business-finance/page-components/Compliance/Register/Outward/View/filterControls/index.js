const filterControls = (t) => ([
	{
		name        : 'docType',
		type        : 'select',
		span        : 1,
		placeholder : t('compliance:doc_type'),
		isClearable : true,
		size        : 'sm',
		options     : [
			{ label: t('compliance:invoice'), value: 'INVOICE' },
			{ label: t('compliance:credit_note'), value: 'CREDIT_NOTE' },
		],
	},
	{
		name        : 'irnStatus',
		type        : 'select',
		span        : 1,
		placeholder : t('compliance:irn_status'),
		isClearable : true,
		size        : 'sm',
		options     : [{ value: 'true', label: t('compliance:success') },
			{ value: 'false', label: t('compliance:fail') }],
	},
]);
export default filterControls;
