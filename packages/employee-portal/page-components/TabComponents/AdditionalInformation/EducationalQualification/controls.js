import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const EDUCATION_LEVEL_OPTIONS = [
	{ label: '10th', value: '10th' },
	{ label: '12th', value: '12th' },
	{ label: 'Diploma', value: 'Diploma' },
	{ label: 'Graduate degree', value: 'graduate_degree' },
	{ label: 'Post Graduates degree', value: 'post_graduates_degree' },
	{ label: 'Doctorate degree', value: 'doctorate_degree' },
];

const getControls = () => [{
	name     : 'education_qualifications',
	type     : 'fieldArray',
	controls : [
		{
			name        : 'education_level',
			label       : 'Education Level*',
			type        : 'createselect',
			options     : EDUCATION_LEVEL_OPTIONS,
			placeholder : 'Degree',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'school_name',
			label       : 'School Name*',
			type        : 'input',
			placeholder : 'Institution Name',
			rules       : { required: 'This is required' },
		},
		{
			name                  : 'started_at',
			label                 : 'Start Date*',
			type                  : 'date-select',
			placeholder           : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			isPreviousDaysAllowed : true,
			rules                 : { required: 'This is required' },
		},
		{
			name                  : 'ended_at',
			label                 : 'End Date*',
			type                  : 'date-select',
			placeholder           : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			isPreviousDaysAllowed : true,
			rules                 : { required: 'This is required' },
		},
		{
			name        : 'score_type',
			label       : 'CGPA/Percentage*',
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
			label       : 'Enter Score*',
			type        : 'number',
			placeholder : 'Enter your score',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'degree',
			label       : 'Degree',
			type        : 'select',
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
			label   : 'Upload Degree Proof/Passing Certificate*',
			type    : 'fileUpload',
			accept  : '.pdf',
			maxSize : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],
			rules   : { required: 'This is required' },
		},
	],
}];

export default getControls;
