const getPrimaryControls = ({ parameterOptions = [] }) => ([
	{
		name        : 'parameter',
		type        : 'select',
		label       : 'Parameter',
		className   : 'primary sm',
		placeholder : 'Select',
		options     : parameterOptions,
		rules       : { required: 'Required' },
		style       : {
			minWidth : '25%',
			maxWidth : '25%',
		},
	},
	{
		name        : 'value',
		type        : 'number',
		label       : 'Value',
		placeholder : 'value',
		style       : {
			minWidth : '25%',
			maxWidth : '25%',
		},
		rules: { required: 'Required' },
	},

]);

export default getPrimaryControls;
