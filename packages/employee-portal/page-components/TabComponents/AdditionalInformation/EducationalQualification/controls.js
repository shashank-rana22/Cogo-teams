const getControls = [{
	name     : 'education_qualifications',
	type     : 'fieldArray',
	controls : [
		{
			name    : 'type',
			label   : 'Education Level',
			type    : 'createselect',
			options : [{ label: '10th', value: '10th' },
				{ label: '12th', value: '12th' },
				{ label: 'B.Tech', value: 'B.Tech' },
				{ label: 'M.Tech', value: 'M.Tech' },
				{ label: 'MBA', value: 'MBA' },
				{ label: 'B.Sc', value: 'B.Sc' },
				{ label: 'M.Sc', value: 'M.Sc' },
				{ label: 'B.Com', value: 'M.Com' },
				{ label: 'BCA', value: 'BCA' },
				{ label: 'MCA', value: 'MCA' },
				{ label: 'Diploma', value: 'Diploma' },
			],
			placeholder: 'Degree',
		},
		{
			name        : 'school_name',
			label       : 'School Name',
			type        : 'input',
			placeholder : 'Institution Name',
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
				width      : '50%',
				marginLeft : '10px',
			},
		},
		{
			name        : 'score',
			label       : 'Enter Score',
			type        : 'number',
			placeholder : 'Enter your score',
			rules       : { required: 'This is required' },
			style       : {
				width: '60%',
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
			name        : 'description',
			label       : 'Description',
			type        : 'textarea',
			placeholder : 'Description',
		},
	],

}];

export default getControls;
