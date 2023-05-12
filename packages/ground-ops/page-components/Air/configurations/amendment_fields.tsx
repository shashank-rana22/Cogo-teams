function formatDate(date) {
	if (date) {
		return new Date(date).toLocaleDateString('en-GB', {
			day   : 'numeric',
			month : 'short',
			year  : 'numeric',
		});
	}
	return new Date().toLocaleDateString('en-GB', {
		day   : 'numeric',
		month : 'short',
		year  : 'numeric',
	});
}

export const AmendmentFields = {
	fields: [
		{
			key   : 'serialId',
			label : 'SID',
			span  : 0.8,
			func  : 'handleSerialId',
		},
		{
			key   : 'blCategory',
			label : 'AWB Category',
			span  : 1,
			func  : 'handleBlCategory',
		},
		{
			key   : 'awbNumber',
			label : 'AWB',
			span  : 1.2,
		},
		{
			key   : 'deadline',
			label : 'Due On',
			span  : 1.5,
			func  : 'handleDeadline',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 1,
			func  : 'handleStatus',
		},
		{
			key   : 'downloadManifest',
			label : '',
			span  : 0.6,
			func  : 'handleDownloadManifest',
		},
		{
			key   : 'download',
			label : '',
			span  : 0.4,
			func  : 'handleDownload',
		},
		{
			key   : 'edit',
			label : '',
			span  : 0.4,
			func  : 'handleEdit',
		},
	],
};
