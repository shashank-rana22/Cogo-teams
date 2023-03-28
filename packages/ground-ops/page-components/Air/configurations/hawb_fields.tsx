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
			key   : 'documentType',
			label : 'AWB',
			span  : 1.2,
			func  : 'startCase',
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
