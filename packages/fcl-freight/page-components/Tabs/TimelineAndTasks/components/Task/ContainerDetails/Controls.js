const controls = [
	{
		name: 'container_number',
		type: 'fieldArray',
		showButtons: true,
		label: 'Container number',
		buttonText: 'Add Container Number',
		noDeleteButtonTill: 1,
		value: [{ container_number: '' }],

		controls: [
			{
				label: 'Container Number',
				name: 'container_number',
				span: 5,
				type: 'text',
				rules: { required: 'Required' },
			},
		],
	},
];

export default controls;
