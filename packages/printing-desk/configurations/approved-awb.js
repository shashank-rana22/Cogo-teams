export const approvedAWBFields = ({ t = () => {} }) => {
	const fields = [
		{
			key   : 'serialId',
			label : t('printingDesk:approved_awb_fields_sid_label'),
			span  : 2,
			func  : 'handleSerialId',
		},
		{
			key   : 'awbNumber',
			label : t('printingDesk:approved_awb_fields_awb_label'),
			span  : 2,
		},
		{
			key   : 'blCategory',
			label : t('printingDesk:approved_awb_fields_awb_category_label'),
			span  : 2,
			func  : 'handleBlCategory',
		},
		{
			key   : 'downloadManifest',
			label : '',
			span  : 1,
			func  : 'handleDownloadManifest',
		},
		{
			key   : 'download',
			label : '',
			span  : 1,
			func  : 'handleDownload',
		},
		{
			key   : 'handover',
			label : '',
			span  : 2,
			func  : 'handleHandover',
		},
	];
	return fields;
};
