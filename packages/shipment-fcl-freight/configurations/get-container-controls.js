import { IcMUpload } from '@cogoport/icons-react';

// const controls = [
// 	{
// 		name             : 'bl_details',
// 		type             : 'fieldArray',
// 		showDeleteButton : false,
// 		showButtons      : false,
// 		controls         : [
// 			{
// 				name  : 'bl_number',
// 				type  : 'text',
// 				label : 'Bl number',
// 				rules : {
// 					required: { value: true, message: 'Bl number is required' },
// 				},
// 				span : 6,
// 				show : true,
// 			},
// 			{
// 				name  : 'bl_id',
// 				type  : 'text',
// 				label : 'bl_id',
// 				rules : { required: { value: true, message: 'Bl id is required' } },
// 				show  : false,
// 			},
// 			{
// 				name     : 'container_number',
// 				label    : 'Container number',
// 				type     : 'select',
// 				multiple : true,
// 				options  : [],
// 				rules    : {
// 					required: { value: true, message: 'Container is required' },
// 				},
// 				span : 6,
// 				show : true,
// 			},
// 			{
// 				name  : 'id',
// 				type  : 'text',
// 				label : 'id',
// 				rules : {
// 					required: { value: true, message: 'Container id is required' },
// 				},
// 				show: false,
// 			},
// 		],
// 	},
// ];
// export default controls;

export const controls = [
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
];
