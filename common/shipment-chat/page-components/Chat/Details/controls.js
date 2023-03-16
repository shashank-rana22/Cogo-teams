const getControls = ({ rows }) => [
	{
		name: 'message',
		placeholder: 'Type your message here.....',
		type: 'textarea',
		className: 'primary md',
		resize: true,
		rows,
	},
	{
		name: 'file',
		type: 'file',
		span: 2,
		uploadText: 'Upload from my Computer',
		placeholder: '  ',
		uploadType: 'aws',
		multiple: true,
		height: 45,
	},
];

export default getControls;
