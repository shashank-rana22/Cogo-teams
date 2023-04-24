const controls = ({ data = {} }) => {
	const file_nameArr = (data?.url || '').split('/');
	const file_name = file_nameArr[file_nameArr.length - 1];
	const form_controls = [
		{
			label       : 'Master Bill of lading Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			value       : data?.document_number,
			validations : [{ type: 'required', message: 'BL Number is required' }],
		},
		{
			label       : 'Container Quantity',
			name        : 'containers_count',
			type        : 'number',
			span        : 6,
			min         : 1,
			disabled    : true,
			value       : data?.containers_count,
			validations : [
				{ type: 'required', message: 'Container Quantity is required' },
				{
					type    : 'min',
					message : 'Container Quantity cannot be less than 1',
					min     : 1,
				},
			],
		},
		{
			name          : 'url',
			span          : 12,
			value         : data?.url ? { url: data?.url, name: file_name } : null,
			type          : 'file',
			themeType     : 'secondary',
			drag          : true,
			isShipment    : true,
			uploadIcon    : 'ic-upload',
			document_type : 'draft_bill_of_ladiing',
			label         : 'Document URl',
			accept        : 'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			uploadType    : 'aws',
			validations   : [
				{
					type    : 'required',
					message : 'document is required',
				},
			],
		},
		{
			label : 'Document Description (optional)',
			name  : 'description',
			type  : 'textarea',
			span  : 12,
			rows  : 2,
		},
	];
	return form_controls;
};

export default controls;
