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
			minWidth : '18%',
			maxWidth : '18%',
		},
	},
	{
		name        : 'value',
		type        : 'number',
		label       : 'Base Score',
		placeholder : 'Score',
		rules       : { required: 'Required' },
	},

]);

export default getPrimaryControls;
