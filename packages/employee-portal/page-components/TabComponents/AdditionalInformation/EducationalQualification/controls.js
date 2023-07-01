import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const EDUCATION_LEVEL_OPTIONS = [
	{ label: '10th', value: '10th' },
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
];

const getControls = [{
	name     : 'education_qualifications',
	type     : 'fieldArray',
	controls : [
		{
			name        : 'type',
			label       : 'Education Level',
			type        : 'createselect',
			options     : EDUCATION_LEVEL_OPTIONS,
			placeholder : 'Degree',
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
			placeholder           : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			isPreviousDaysAllowed : true,
			rules                 : { required: 'This is required' },
		},
		{
			name                  : 'ended_at',
			label                 : 'End Date',
			type                  : 'date-select',
			placeholder           : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			isPreviousDaysAllowed : true,
			rules                 : { required: 'This is required' },
		},
		{
			name        : 'score_type',
			label       : 'CGPA/Percentage',
			type        : 'select',
			placeholder : 'Select Mode',
			rules       : { required: 'This is required' },
			options     : [
				{ label: 'CGPA', value: 'cgpa' },
				{ label: 'Percentage', value: 'percentage' },
			],
		},
		{
			name        : 'score',
			label       : 'Enter Score',
			type        : 'number',
			placeholder : 'Enter your score',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'degree',
			label       : 'Degree',
			type        : 'input',
			placeholder : 'Enter Degree',
		},
		{
			name        : 'specialization',
			label       : 'Specialization',
			type        : 'input',
			placeholder : 'Add Specialization',
		},
		{
			name    : 'degree_proof',
			label   : 'Upload Degree Proof',
			type    : 'fileUpload',
			accept  : '.pdf',
			maxSize : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],
			rules   : { required: 'This is required' },
		},
	],
}];

export default getControls;
