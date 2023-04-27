import { IcMUpload } from '@cogoport/icons-react';

const uploadControls = () => ({
	hawb_controls: [
		{
			name        : 'document_number',
			label       : 'Document Number',
			type        : 'number',
			span        : 7,
			placeholder : 'Document Number',
			rules       : { required: true },
		},
	],
	all_controls: [
		{
			name        : 'remark',
			label       : 'Document Description (optional)',
			type        : 'textarea',
			span        : 12,
			maxLength   : 150,
			placeholder : 'Remarks',
			rows        : 3,
			style       : { height: '120px', border: '1px solid #BDBDBD', borderRadius: 4 },
		},
		{
			name       : 'document',
			label      : 'Document',
			type       : 'file',
			drag       : true,
			span       : 8,
			maxSize    : '10485760',
			uploadType : 'aws',
			height     : '88',
			uploadIcon : <IcMUpload height={40} width={40} />,
			style      : { boxShadow: '0px 0px 8px rgba(98, 127, 172, 0.2)', borderRadius: 4 },
			accept     : '.png,.pdf,.jpg,.jpeg,.doc,.docx',
			rules      : { required: true },
		},
	],
});

export default uploadControls;
