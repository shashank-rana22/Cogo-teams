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
			func  : 'startCase',
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
			key   : 'origin',
			label : 'Origin',
			span  : 2,
			func  : 'startCase',

		},
		{
			key   : 'destination',
			label : 'Destination',
			span  : 2,
			func  : 'startCase',
		},
		{
			key   : 'airline',
			label : 'Carrier',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'deadline',
			label : 'Due On',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key    : 'status',
			label  : 'Status',
			span   : 1,
			render : (item) => (
				<div style={{ textTransform: 'uppercase' }}>
					{item.documentState ? 'Approve' : 'Amend'}
				</div>
			),
		},
		{
			key   : 'download',
			label : '',
			span  : 1,
			func  : 'handleDownload',
		},
	],
};
