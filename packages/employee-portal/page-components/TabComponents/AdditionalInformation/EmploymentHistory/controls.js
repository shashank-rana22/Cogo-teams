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
			name                  : 'started_at',
			label                 : 'Start Date',
			type                  : 'date-select',
			placeholder           : 'DD/MM/YYYY',
			isPreviousDaysAllowed : true,
			rules                 : { required: 'This is required' },
			style                 : {
				width: '70%',
			},
		},
		{
			name                  : 'ended_at',
			label                 : 'End Date',
			type                  : 'date-select',
			placeholder           : 'DD/MM/YYYY',
			isPreviousDaysAllowed : true,
			rules                 : { required: 'This is required' },
			style                 : {
				width: '70%',
			},
		},
		{
			name        : 'description',
			label       : 'Designation',
			type        : 'textarea',
			placeholder : 'Designation',
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
