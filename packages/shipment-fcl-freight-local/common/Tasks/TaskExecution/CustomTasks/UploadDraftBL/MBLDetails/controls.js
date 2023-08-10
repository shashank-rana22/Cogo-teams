const controls = ({ data = {} }) => {
	const file_nameArr = (data?.url || '').split('/');
	const file_name = file_nameArr[file_nameArr.length - 1];

	let containersCount = 0;
	(data?.cargo_details || []).forEach((container) => {
		containersCount += container?.containers_count || 0;
	});

	const form_controls = [
		{
			label : 'Master Bill of lading Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			size  : 'sm',
			value : data?.document_number,
			rules : { required: 'BL Number is required' },
		},
		{
			label    : 'Container Quantity',
			name     : 'containers_count',
			type     : 'number',
			span     : 6,
			size     : 'sm',
			min      : 1,
			disabled : true,
			value    : containersCount,
			rules    : { required: 'Container Quantity is required' },
		},
		{
			name   : 'url',
			span   : 12,
			size   : 'sm',
			value  : data?.url ? { url: data?.url, name: file_name } : null,
			type   : 'file',
			label  : 'Document URL',
			accept : 'image/*,.pdf,.doc,.docx,application/msword,'
			+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			rules: { required: 'Document is required' },
		},
		{
			label : 'Document Description (optional)',
			name  : 'description',
			type  : 'textarea',
			span  : 12,
			size  : 'sm',
		},
	];
	return form_controls;
};

export default controls;
