const getControls = [{
	name     : 'education_qualifications',
	type     : 'fieldArray',
	controls : [
		{
			name        : 'institution_name',
			label       : 'Institution Name',
			type        : 'input',
			placeholder : 'Institution Name',
		},
		{
			name        : 'description',
			label       : 'Description',
			type        : 'textarea',
			placeholder : 'Description',
		},
		{
			name                  : 'started_at',
			label                 : 'Start Date',
			type                  : 'date-select',
			placeholder           : 'DD/MM/YYYY',
			isPreviousDaysAllowed : true,
			rules                 : { required: 'This is required' },
			style                 : {
				width: '75%',
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
				width: '75%',
			},
		},
		{
			name        : 'Courses',
			label       : 'Courses',
			type        : 'createmultiselect',
			placeholder : 'Enter Courses',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'score_mode',
			label       : 'CGPA/Percentage',
			type        : 'select',
			placeholder : 'Select Mode',
			rules       : { required: 'This is required' },
			options     : [
				{ label: 'CGPA', value: 'cgpa' },
				{ label: 'Percentage', value: 'percentage' },
			],
			style: {
				width: '50%',
			},
		},
		{
			name        : 'score_mode',
			label       : 'Enter Score',
			type        : 'number',
			placeholder : 'Enter your score',
			rules       : { required: 'This is required' },
			style       : {
				width: '60%',
			},
		}],

}];

export default getControls;
