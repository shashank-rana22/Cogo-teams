export const hawbFields = (t) => {
	const fields = [
		{
			key   : 'serialId',
			label : t('printingDesk:hawb_fields_label1'),
			span  : 2,
			func  : 'handleSerialId',
		},
		{
			key   : 'documentNumber',
			label : t('printingDesk:hawb_fields_label2'),
			span  : 2,
			func  : 'handleDocumentNumber',
		},
		{
			key   : 'documentType',
			label : t('printingDesk:hawb_fields_label3'),
			span  : 2,
			func  : 'startCase',
		},
		{
			key   : 'download',
			label : '',
			span  : 1,
			func  : 'handleDownload',
		},
	];

	return fields;
};
