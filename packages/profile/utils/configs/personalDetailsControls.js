import {
	SelectController, DatepickerController,
	InputController, MobileNumberController,
} from '@cogoport/forms';

export const BASIC_CONTROLS = [
	{
		label       : 'First Name',
		name        : 'first_name',
		controlType : 'text',
		placeholder : 'First Name',
	},
	{
		label       : 'Middle Name',
		name        : 'middle_name',
		controlType : 'text',
		placeholder : 'Middle Name',
	},
	{
		label       : 'Last Name',
		name        : 'last_name',
		controlType : 'text',
		placeholder : 'Last Name',
	},
	{
		label       : 'Legal Name',
		name        : 'legal_name',
		controlType : 'text',
		placeholder : 'Legal Name',
	},
	{
		label       : 'Email',
		name        : 'cogoport_email',
		controlType : 'text',
		placeholder : 'Email',
	},
	{
		label       : 'Personal Email',
		name        : 'personal_email',
		controlType : 'text',
		placeholder : 'Personal Email',
	},
	{
		label       : 'Mobile Number',
		name        : 'mobile_number',
		controlType : 'mobile',
		placeholder : 'Mobile Number',
	},
	{
		label       : 'Alternate Mobile Number',
		name        : 'alternate_mobile_number',
		controlType : 'mobile',
		placeholder : 'Alternate Mobile Number',
	},
	{
		label       : 'Emergency Contact Number',
		name        : 'emergency_contact_number',
		controlType : 'mobile',
		placeholder : 'Emergency Contact Number',
	},
	{
		name        : 'gender',
		label       : 'Select Gender',
		controlType : 'select',
		placeholder : 'Gender',
		options     : [
			{
				label : 'Male',
				value : 'Male',
			},
			{
				label : 'Female',
				value : 'Female',
			},
			{
				label : 'Other',
				value : 'Other',
			},
		],
		isClearable: true,
	},
	{
		label                 : 'Date of birth',
		name                  : 'date_of_birth',
		controlType           : 'date',
		placeholder           : 'Date of birth',
		isPreviousDaysAllowed : true,
		dateFormat            : 'dd-MM-yyyy',
	},
	{
		name        : 'marital_status',
		label       : 'Marital Status',
		controlType : 'select',
		placeholder : 'Marital Status',
		options     : [
			{
				label : 'Married',
				value : 'married',
			},
			{
				label : 'Single',
				value : 'single',
			},
		],
		isClearable: true,
	},
	{
		label       : 'Blood Group',
		name        : 'blood_group',
		controlType : 'text',
		placeholder : 'Blooed Group',
	},
	{
		label       : 'Disability Level',
		name        : 'disability_level',
		controlType : 'text',
		placeholder : 'Disability Level',
	},
	{
		label       : 'Allergies',
		name        : 'allergies',
		controlType : 'text',
		placeholder : 'Allergies',
	},
];

export const MEDIA_CONTROLS = [
	{
		label       : 'Linkedin',
		name        : 'linkedin',
		controlType : 'text',
		placeholder : 'Linkedin Profile Link',
	},
	{
		label       : 'Github',
		name        : 'github',
		controlType : 'text',
		placeholder : 'Github Profile Link',
	},
	{
		label       : 'Instagram',
		name        : 'instagram',
		controlType : 'text',
		placeholder : 'Instagram Profile Link',
	},
	{
		label       : 'Twitter',
		name        : 'twitter',
		controlType : 'text',
		placeholder : 'Twitter Profile Link',
	},
	{
		label       : 'Figma',
		name        : 'figma',
		controlType : 'text',
		placeholder : 'Figma Profile Link',
	},
	{
		label       : 'Facebook',
		name        : 'facebook',
		controlType : 'text',
		placeholder : 'Facebook Profile Link',
	},
];

export const PREVIOUS_JOB_HISTORY = [
	{
		label       : 'Company Name',
		name        : 'company_name',
		controlType : 'text',
		placeholder : 'Previous Company name',
	},
	{
		label       : 'Role',
		name        : 'role',
		controlType : 'text',
		placeholder : 'Enter role at previous company',
	},
	{
		label       : 'Type',
		name        : 'type',
		controlType : 'select',
		options     : [{ label: 'Intern', value: 'intern' }, { label: 'Full-Time', value: 'fulltime' },
			{ label: 'Part-Time', value: 'parttime' },
			{ label: 'Contract', value: 'contract' }],
		placeholder: 'Enter Employment type',
	},
];

export const FAMILY_CONTROLS = [
	{
		label       : 'Father Name',
		name        : 'father_name',
		controlType : 'text',
		placeholder : 'Father Name',
	},
	{
		label       : 'Mother Name',
		name        : 'mother_name',
		controlType : 'text',
		placeholder : 'Mother Name',
	},
	{
		label       : "Father's Phone Number",
		name        : 'father_mobile_number',
		controlType : 'mobile',
		placeholder : "Father's Phone Number",
	},
	{
		label       : "Mother's Phone Number",
		name        : 'mother_mobile_number',
		controlType : 'mobile',
		placeholder : "Mother's Phone Number",
	},
	{
		name        : 'are_parents_senior_citizen',
		label       : 'Are Parents Senior Citizen?',
		controlType : 'select',
		placeholder : 'Are Parents Senior Citizen?',
		options     : [
			{
				label : 'Yes',
				value : 'Yes',
			},
			{
				label : 'No',
				value : 'No',
			},
		],
		isClearable: true,
	},
	{
		name        : 'Dependent',
		label       : 'Dependent/Disability',
		controlType : 'select',
		placeholder : 'Dependent/Disability',
		options     : [
			{
				label : 'Yes',
				value : 'Yes',
			},
			{
				label : 'No',
				value : 'No',
			},
		],
		isClearable: true,
	},
	{
		label       : 'Guardian Name',
		name        : 'guardian_name',
		controlType : 'text',
		placeholder : 'Guardian Name',
	},
	{
		label       : 'Guardian Mobile Number',
		name        : 'guardian_mobile_number',
		controlType : 'mobile',
		placeholder : 'Guardian Mobile Number',
	},
	{
		label       : 'Family Physician Name',
		name        : 'family_physician_name',
		controlType : 'text',
		placeholder : 'Family Physician Name',
	},
	{
		label       : 'Family Physician Mobile Number',
		name        : 'family_physician_mobile_number',
		controlType : 'mobile',
		placeholder : 'Family Physician Mobile Number',
	},
];

export const ADDRESS_CONTROLS = [
	{
		label       : 'Address',
		name        : 'address',
		controlType : 'text',
		placeholder : 'Address',
	},
	{
		label       : 'City',
		name        : 'city',
		controlType : 'text',
		placeholder : 'City',
	},
	{
		label       : 'State',
		name        : 'state',
		controlType : 'text',
		placeholder : 'State',
	},
	{
		label       : 'Pincode',
		name        : 'pincode',
		controlType : 'text',
		placeholder : 'pincode',
	},
	{
		label       : 'Country',
		name        : 'country',
		controlType : 'text',
		placeholder : 'Country',
	},

];

export const CONTROL_MAPPING = {
	select : SelectController,
	date   : DatepickerController,
	text   : InputController,
	mobile : MobileNumberController,
};
