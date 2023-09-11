const getPrimaryControls = () => ([
	{
		name        : 'parameter',
		type        : 'select',
		label       : 'Parameter',
		className   : 'primary sm',
		placeholder : 'select',
		rules       : { required: 'Required' },
	},
	{
		name        : 'scoring_type',
		type        : 'number',
		label       : 'Scoring Type',
		placeholder : 'Value',
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
		style       : {
			width: '250px',
		},
		rules: { required: 'Required' },
	},
	{
		name        : 'realised_dtrigger',
		type        : 'select',
		label       : 'Realised Trigger',
		placeholder : 'Select',
		style       : {
			width: '250px',
		},
		rules: { required: 'Required' },
	},

]);

export default getPrimaryControls;
