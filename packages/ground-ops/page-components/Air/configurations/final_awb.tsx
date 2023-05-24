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
