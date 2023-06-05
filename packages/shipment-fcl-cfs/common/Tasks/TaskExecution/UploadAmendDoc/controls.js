import getExtraControls from './extraControlAmend';

const getControls = (data) => getExtraControls[data.document_type] || [];

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
					'image/*,.pdf,.doc,.docx,.xlsx,application/msword,'
					+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				uploadType : 'aws',
				rules      : { required: { value: true, message: 'Document is required' } },
			},
		],
	},
];

export default controls;
