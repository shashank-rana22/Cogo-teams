export const handedOverFields = ({ t = () => {} }) => {
	const fields = [
		{
			key   : 'serialId',
			label : t('printingDesk:handed_over_sid_label'),
			span  : 2,
			func  : 'handleSerialId',
		},
		{
			key   : 'awbNumber',
			label : t('printingDesk:handed_over_awb_label'),
			span  : 2,
		},
		{
			key   : 'blCategory',
			label : t('printingDesk:handed_over_awb_category_label'),
			span  : 2,
			func  : 'handleBlCategory',
		},
		{
			key   : 'downloadManifest',
			label : '',
			span  : 1.5,
			func  : 'handleDownloadManifest',
		},
		{
			key   : 'handoverDate',
			label : t('printingDesk:handed_over_handover_date_label'),
			span  : 2,
			func  : 'handleHandoverDate',
		},
		{
			key   : 'download',
			label : '',
			span  : 0.5,
			func  : 'handleDownload',
		},
		{
			key   : 'edit',
			label : '',
			span  : 0.5,
			func  : 'handleEdit',
		},
	];
	return fields;
};
