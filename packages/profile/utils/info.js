export const personalInfo = [
	{
		heading : 'BASIC INFORMATION',
		details : [
			{ label: 'First Name', key: 'processed', value: 'first_name' },
			{ label: 'Last Name', key: 'processed', value: 'last_name' },
			{ label: 'Email', key: 'details', value: 'cogoport_email' },
			{ label: 'Phone Number', key: 'details', value: ['mobile_country_code', 'mobile_number'] },
			{ label: 'Personal Email', key: 'details', value: 'personal_email' },
			{
				label : 'Alternate Number',
				key   : 'personal',
				value : ['alternate_mobile_country_code', 'alternate_mobile_number'],
			},
			{ label: 'Gender', key: 'details', value: 'gender' },
			{ label: 'Date of Birth', key: 'details', value: 'date_of_birth' },
			{ label: 'Marital Status', key: 'personal', value: 'marital_status' },
			{ label: 'Blood Group', key: 'personal', value: 'blood_group' },
			{ label: 'Disability Level', key: 'personal', value: 'disability_level' },
			{ label: 'Allergies', key: 'personal', value: 'allergies' },
		],
	},
	{
		heading : 'FAMILY INFORMATION',
		details : [
			{ label: 'Fathers Name', key: 'family', value: 'father_name' },
			{ label: 'Mothers Name', key: 'family', value: 'mother_name' },
			{
				label : 'Fathers Phone Number',
				key   : 'family',

				value: ['father_mobile_country_code', 'father_mobile_number'],
			},
			{
				label : 'Mothers Phone Number',
				key   : 'family',
				value : ['mother_mobile_country_code', 'mother_mobile_number'],
			},
			{ label: 'Are your parents senior citizens?', key: 'family', value: 'are_parents_senior_citizen' },
			{ label: 'Dependent/Disability', key: 'family', value: 'Dependent' },
			{ label: 'Guardians Name', key: 'family', value: 'guardian_name' },
			{
				label : 'Guardians Phone Number',
				key   : 'family',
				value : ['guardian_mobile_country_code', 'guardian_mobile_number'],
			},
			{ label: 'Family Physician', key: 'family', value: 'family_physician_name' },
			{
				label : 'Family Physician Phone Number',
				key   : 'family',
				value : ['family_physician_country_code', 'family_physician_mobile_number'],
			},
		],
	},
	{
		heading : 'ADDRESS INFORMATION',
		details : [
			{ label: 'Address Line 1', key: 'address', value: 'address' },
			{ label: 'Address Line 2', key: 'address', value: '-' },
			{ label: 'City', key: 'address', value: 'city' },
			{ label: 'State', key: 'address', value: 'state' },
			{ label: 'Pincode', key: 'address', value: 'pincode' },
			{ label: 'Country', key: 'address', value: 'country' },
		],
	},
];

export const employmentInfo = [
	{
		heading : 'BASIC DETAILS',
		details : [
			{ label: 'Employee Code', key: 'details', value: 'employee_code' },
			{ label: 'Employment Type', key: 'details', value: 'employee_type' },
			{ label: 'Joining Date', key: 'processed', value: 'date_of_joining' },
			{ label: 'Age in Organization', key: 'processed', value: 'age_in_organization' },
		],
	},
	{
		heading : 'JOB  INFORMATION',
		details : [
			{ label: 'Branch Location', key: 'details', value: 'office_location' },
			{ label: 'Department', key: 'details', value: 'department' },
			{ label: 'Role', key: 'details', value: 'role_name' },
			{ label: 'Designation', key: 'details', value: 'designation' },
			{ label: 'Reporting Supervisor', key: 'details', value: 'reporting_manager_name' },
			{ label: 'HRBP', key: 'details', value: 'hrbp_name' },
			{ label: 'Job Segment', key: 'details', value: 'job_segment' },
			{ label: 'PMS', key: 'details', value: 'Set C' },
		],
	},
];

export const statutoryInfo = {
	heading : 'BASIC DETAILS',
	details : [
		{ label: 'PF Applicable', value: true },
		{ label: 'PF Pension Applicable', value: true },
		{ label: 'Employee PF Ceiling Applicable', value: true },
		{ label: 'Employer PF Ceiling Applicable', value: true },
		{ label: 'PF Joining Date', value: '23/03/2022' },
		{ label: 'PF Number', value: '00125510' },
		{ label: 'UAN Number', value: '54893120051' },
		{ label: 'PF Wage', value: 0 },
		{ label: 'VPF', value: '0.0%' },
		{ label: 'ESIC Applicable', value: true },
		{ label: 'PT Applicable', value: true },
		{ label: 'LWF Applicable', value: true },
		{ label: 'IT Applicable', value: true },
		{ label: 'Gratuity Applicable', value: true },
		{ label: 'NPS Applicable', value: false },
		{ label: 'Decimal Rates Allowed', value: true },
		{ label: 'Previous year Tax Regime', value: 'Old Regime' },
		{ label: 'Tax Regime', value: 'Old Regime' },
		{ label: 'Tax Regime Updated by', value: 'Ganesh Chandak' },
		{ label: 'Tax Regime Updated at', value: '12:13, 23/03/2022' },
	],
};

export const otherInfo = {
	heading : 'Custom Field Information',
	details : [
		{ label: 'Medical Insurance Applicable', value: true },
		{ label: 'Medical Policy Number', value: '24646154' },
	],
};
