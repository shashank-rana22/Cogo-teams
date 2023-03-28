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

export const FinalAwbFields = {
	fields: [
		{
			key    : 'serialId',
			label  : 'SID',
			span   : 1,
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
			span  : 1,
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
			span  : 3,
			func  : 'startCase',

		},
		{
			key   : 'destination',
			label : 'Destination',
			span  : 3,
			func  : 'startCase',
		},
		{
			key   : 'airline',
			label : 'Carrier',
			span  : 1,
			func  : 'startCase',
		},
		{
			key    : 'deadline',
			label  : 'Due On',
			span   : 1,
			render : (item) => (
				<div style={{ textTransform: 'uppercase' }}>
					{formatDate(item.deadline)}
				</div>
			),
		},
		{
			key   : 'upload',
			label : '',
			span  : 1,
			func  : 'handleUpload',
		},
	],
};
