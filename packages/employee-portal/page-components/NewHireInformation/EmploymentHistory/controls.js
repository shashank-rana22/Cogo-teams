const getControls = [{
	name     : 'employment_history',
	type     : 'fieldArray',
	controls : [
		{
			name        : 'company_name',
			label       : 'Company Name',
			type        : 'input',
			placeholder : 'Company Name',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'description',
			label       : 'Description',
			type        : 'textarea',
			placeholder : 'Description',
		},
		{
			name        : 'started_at',
			label       : 'Start Date',
			type        : 'date-select',
			placeholder : 'DD/MM/YYYY',
			rules       : { required: 'This is required' },
			style       : {
				width: '70%',
			},
		},
		{
			name        : 'ended_at',
			label       : 'End Date',
			type        : 'date-select',
			placeholder : 'DD/MM/YYYY',
			rules       : { required: 'This is required' },
			style       : {
				width: '70%',
			},
		},
		{
			name        : 'skills',
			label       : 'Skills',
			type        : 'createmultiselect',
			placeholder : 'Skills',
			rules       : { required: 'This is required' },
		},
	],
}];

export default getControls;
