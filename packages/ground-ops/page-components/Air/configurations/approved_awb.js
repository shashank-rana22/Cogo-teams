export const ApprovedAWBFields = {
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
