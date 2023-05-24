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

export const ApprovalPendingFields = {
	fields: [
		{
			key    : 'serialId',
			label  : 'SID',
			span   : 0.8,
			render : (item) => (
				<div>
					#
					{item.serialId}
				</div>
			),
		},
		{
			key   : 'awbNumber',
			label : 'AWB',
			span  : 1.2,
		},
		{
			key    : 'blCategory',
			label  : 'AWB Category',
			span   : 1,
			render : (item) => (
				<div style={{ textTransform: 'uppercase' }}>
					{item.blCategory}
				</div>
			),
		},
		{
			key    : 'deadline',
			label  : 'Due On',
			span   : 1.5,
			render : (item) => (
				<div style={{ textTransform: 'uppercase' }}>
					{formatDate(item.deadline)}
				</div>
			),
		},
		{
			key    : 'scheduleDeparture',
			label  : 'Schedule Departure',
			span   : 1.5,
			render : (item) => (
				<div style={{ textTransform: 'uppercase' }}>
					{formatDate(item.scheduleDeparture)}
				</div>
			),
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
