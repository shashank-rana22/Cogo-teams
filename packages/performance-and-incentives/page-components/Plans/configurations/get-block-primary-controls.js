const getPrimaryControls = ({ parameterOptions = [] }) => ([
	{
		name        : 'parameter',
		type        : 'select',
		label       : 'Parameter',
		className   : 'primary sm',
		placeholder : 'Select',
		options     : parameterOptions,
		rules       : { required: 'Required' },
	},
	{
		name        : 'scoring_type',
		type        : 'select',
		label       : 'Scoring Type',
		placeholder : 'Value',
		value       : 'absolute',
		options     : [{
			label : 'Absolute',
			value : 'absolute',
		},
		{
			label : '%',
			value : 'percentage',
		}],
		rules: { required: 'Required' },
	},
	{
		name        : 'scoring_unit',
		type        : 'select',
		label       : '',
		placeholder : 'Unit',
		rules       : { required: 'Required' },
	},
	{
		name        : 'fixed_percentage_value',
		type        : 'number',
		label       : 'Fixed % of SID',
		placeholder : 'Score',
		rules       : { required: 'Required' },
	},
	{
		name        : 'variable_percentage_value',
		type        : 'number',
		label       : 'Variable % post 1st SID',
		placeholder : 'Score',
		rules       : { required: 'Required' },
	},
	{
		name        : 'base_score',
		type        : 'number',
		label       : 'Base Score',
		placeholder : 'Score',
		rules       : { required: 'Required' },
	},
	{
		name        : 'provisional_trigger',
		type        : 'select',
		label       : 'Provisional Trigger',
		placeholder : 'Select',
		rules       : { required: 'Required' },
	},
	{
		name        : 'realised_dtrigger',
		type        : 'select',
		label       : 'Realised Trigger',
		placeholder : 'Select',
		rules       : { required: 'Required' },
	},

]);

export default getPrimaryControls;
