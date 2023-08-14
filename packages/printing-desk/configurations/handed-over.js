export const handedOverFields = {
	fields: [
		{
			key   : 'serialId',
			label : 'SID',
			span  : 2,
			func  : 'handleSerialId',
		},
		{
			key   : 'awbNumber',
			label : 'AWB',
			span  : 2,
		},
		{
			key   : 'blCategory',
			label : 'AWB Category',
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
			label : 'Handover Date',
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
	],
};
