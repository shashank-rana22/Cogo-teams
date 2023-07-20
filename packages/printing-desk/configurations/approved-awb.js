export const approvedAWBFields = {
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
	],
};
