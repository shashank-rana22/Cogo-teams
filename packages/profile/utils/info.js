export const personalInfo = [
	{
		heading : 'BASIC INFORMATION',
		key     : 'basic',
		details : [
			{ label: 'First Name', key: 'processed', value: 'first_name', inputtype: 'input' },
			{ label: 'Middle Name', key: 'processed', value: 'middle_name', inputtype: 'input' },
			{ label: 'Last Name', key: 'processed', value: 'last_name', inputtype: 'input' },
			{ label: 'Legal Name', key: 'personal', value: 'legal_name', inputtype: 'input' },
			{ label: 'Email', key: 'details', value: 'cogoport_email', inputtype: 'input' },

			{
				label     : 'Phone Number',
				key       : 'details',
				value     : ['mobile_country_code', 'mobile_number'],
				inputtype : 'mobile',
			},
			{ label: 'Personal Email', key: 'details', value: 'personal_email', inputtype: 'input' },
			{
				label     : 'Alternate Number',
				key       : 'personal',
				value     : ['alternate_mobile_country_code', 'alternate_mobile_number'],
				inputtype : 'mobile',

			},
			{
				label     : 'Emergency Contact Number',
				key       : 'details',
				value     : ['emergency_contact_details.country_code', 'emergency_contact_details.number'],
				inputtype : 'mobile',

			},
			{
				label     : 'Gender',
				key       : 'details',
				value     : 'gender',
				inputtype : 'select',
				options   : [{ label: 'Male', value: 'male' },
					{ label: 'Female', value: 'female' },
					{ label: 'Others', value: 'others' }],
			},
			{ label: 'Date of Birth', key: 'details', value: 'date_of_birth', inputtype: 'date' },
			{
				label     : 'Marital Status',
				key       : 'personal',
				value     : 'marital_status',
				inputtype : 'select',
				options   : [{ label: 'Married', value: 'married' },
					{ label: 'Single', value: 'single' }],
			},
			{ label: 'Blood Group', key: 'personal', value: 'blood_group', inputtype: 'input' },
			{ label: 'Disability Level', key: 'personal', value: 'disability_level', inputtype: 'input' },
			{ label: 'Allergies', key: 'personal', value: 'allergies', inputtype: 'input' },
		],
	},
	{
		heading : 'FAMILY INFORMATION',
		key     : 'family',
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
		heading : 'SOCIAL MEDIA LINKS',
		key     : 'personal',
		details : [
			{ label: 'Linkedin', key: 'personal', value: 'social_media_links.linkedin' },
			{ label: 'Instagram', key: 'personal', value: 'social_media_links.instagram' },
			{ label: 'Github', key: 'personal', value: 'social_media_links.github' },
			{ label: 'Facebook', key: 'personal', value: 'social_media_links.facebook' },
			{ label: 'Figma', key: 'personal', value: 'social_media_links.figma' },
			{ label: 'Twitter', key: 'personal', value: 'social_media_links.twitter' },
		],
	},
	{
		heading : 'ADDRESS INFORMATION',
		key     : 'address',
		details : [
			{ label: 'Address Line', key: 'address', value: 'address' },
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
	{
		heading : 'PREVIOUS JOB  INFORMATION',
		details : [
			{ label: 'Company Name', key: 'details', value: 'company_name' },
			{ label: 'Role', key: 'details', value: 'role' },
			{
				label   : 'Type',
				value   : 'role_type',
				type    : 'select',
				options : [{ label: 'Intern', value: 'intern' }, { label: 'Full-Time', value: 'fulltime' },
					{ label: 'Part-Time', value: 'parttime' },
					{ label: 'Contract', value: 'contract' }],
			},
		],
	},
	{
		heading : 'JOB SQUADS',
		details : [
			{ label: 'Chapter Name', key: 'employee_squad', value: 'chapter_name', isStartCase: true },
			{ label: 'Squad Name', key: 'employee_squad', value: 'squad_name', isStartCase: true },
			{ label: 'Sub Chapter Name', key: 'employee_squad', value: 'sub_chapter_name', isStartCase: true },
			{ label: 'Tribe Name', key: 'employee_squad', value: 'tribe_name', isStartCase: true },
		],
	},
];

export const statutoryInfo = {
	heading : 'BASIC DETAILS',
	details : [
		{ label: 'PF Applicable', key: 'statutory', value: 'pf_applicable' },
		{ label: 'PF Pension Applicable', value: true },
		{ label: 'Employee PF Ceiling Applicable', value: true },
		{ label: 'PF Joining Date', value: '23/03/2022' },
		{ label: 'PF Number', value: '00125510' },
		{ label: 'UAN Number', value: '54893120051' },
		{ label: 'PF Wage', value: 0 },
		{ label: 'VPF', value: '0.0%' },
		{ label: 'ESIC Applicable', key: 'statutory', value: 'esic' },
		{ label: 'PT Applicable', key: 'statutory', value: 'professional_tax' },
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

export const bankInfo = [
	{ label: 'Account Holder Name', value: 'account_holder_name', type: 'input' },
	{ label: 'Account Number', value: 'account_number', type: 'input' },
	{ label: 'Branch Name', value: 'bank_branch_name', type: 'input' },
	{ label: 'Bank Name', value: 'bank_name', type: 'input' },
	{ label: 'IFSC CODE', value: 'ifsc_code', type: 'input' },
];

export const pfInfo = [
	{
		label   : 'ESIC',
		value   : 'esic',
		type    : 'select',
		options : [{ label: 'Active', value: 'active' }, { label: 'Non-Active', value: 'nonactive' }],
	},
	{
		label   : 'PF APPLICABLE',
		value   : 'pf_applicable',
		type    : 'select',
		options : [{ label: 'Active', value: 'active' }, { label: 'Non-Active', value: 'nonactive' }],
	},
	{
		label   : 'PROFESSIONAL TAX',
		value   : 'professional_tax',
		type    : 'select',
		options : [{ label: 'Active', value: 'active' }, { label: 'Non-Active', value: 'nonactive' }],
	},
];
