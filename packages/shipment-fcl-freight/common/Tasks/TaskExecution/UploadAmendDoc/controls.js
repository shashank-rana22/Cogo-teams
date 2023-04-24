import getExtraControls from './extraControlAmend';

const getControls = (data) => {
	const containers_count = [
		{
			label : 'Container Quantity',
			name  : 'containers_count',
			type  : 'number',
			span  : 6,
			min   : 1,
			rules : {
				required: { value: true, message: 'Container quantity is required' },
			},
		},
	];

	const controls =	getExtraControls[data.document_type] || [];
	const bls = ['draft_bill_of_lading', 'draft_house_bill_of_lading'];

	if (
		data.shipment_type === 'fcl_freight'
		&& bls.includes(data.document_type)
	) {
		return [...controls, ...containers_count];
	}
	return controls;
};

const controls = (data) => [
	{
		name               : 'documents',
		type               : 'fieldArray',
		showButtons        : true,
		showDeleteButton   : true,
		showDivider        : false,
		isSectionRequired  : true,
		noDeleteButtonTill : 1,
		controls           : [
			...getControls(data),
			{
				name          : 'url',
				showLabel     : false,
				span          : 10,
				type          : 'file',
				label         : 'Please Upload your document',
				themeType     : 'secondary',
				drag          : true,
				isShipment    : true,
				uploadIcon    : 'ic-upload',
				document_type : data.document_type,
				accept:
					'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				uploadType : 'aws',
				rules      : { required: { value: true, message: 'Document is required' } },
			},
		],
	},
];

export default controls;
