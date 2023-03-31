export const HawbFields = {
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
			key   : 'documentNumber',
			label : 'Document Number',
			span  : 1.2,
			func  : 'handleDocumentNumber',
		},
		{
			key   : 'documentType',
			label : 'AWB',
			span  : 1.2,
			func  : 'startCase',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 1,
			func  : 'handleStatus',
		},
		{
			key   : 'download',
			label : '',
			span  : 0.5,
			func  : 'handleDownload',
		},
		// {
		// 	key   : 'edit',
		// 	label : '',
		// 	span  : 0.5,
		// 	func  : 'handleEdit',
		// },
	],
};
