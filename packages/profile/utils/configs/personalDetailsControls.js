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
		value_key   : 'processed_employee_detail.first_name',
	},
	{
		label       : 'Middle Name',
		name        : 'middle_name',
		controlType : 'text',
		placeholder : 'Middle Name',
		value_key   : 'processed_employee_detail.middle_name',
	},
	{
		label       : 'Last Name',
		name        : 'last_name',
		controlType : 'text',
		placeholder : 'Last Name',
		value_key   : 'processed_employee_detail.last_name',
	},
	{
		label       : 'Legal Name',
		name        : 'legal_name',
		controlType : 'text',
		placeholder : 'Legal Name',
		value_key   : 'personal_details.legal_name',
	},
	{
		label       : 'Email',
		name        : 'cogoport_email',
		controlType : 'text',
		placeholder : 'Email',
		value_key   : 'employee_detail.cogoport_email',
	},
	{
		label       : 'Personal Email',
		name        : 'personal_email',
		controlType : 'text',
		placeholder : 'Personal Email',
		value_key   : 'employee_detail.personal_email',
	},
	{
		label       : 'Mobile Number',
		name        : 'mobile_number',
		controlType : 'mobile',
		placeholder : 'Mobile Number',
		value_key   : 'employee_detail.mobile_number',
	},
	{
		label       : 'Alternate Mobile Number',
		name        : 'alternate_mobile_number',
		controlType : 'mobile',
		placeholder : 'Alternate Mobile Number',
		value_key   : 'personal_details.alternate_mobile_number',
	},
	{
		label       : 'Emergency Contact Number',
		name        : 'emergency_contact_number',
		controlType : 'mobile',
		placeholder : 'Emergency Contact Number',
		value_key   : 'employee_detail.emergency_contact_details.number',
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
		isClearable : true,
		value_key   : 'employee_detail.gender',
	},
	{
		label                 : 'Date of birth',
		name                  : 'date_of_birth',
		controlType           : 'date',
		placeholder           : 'Date of birth',
		isPreviousDaysAllowed : true,
		dateFormat            : 'dd-MM-yyyy',
		value_key             : 'employee_detail.date_of_birth',
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
		isClearable : true,
		value_key   : 'personal_details.disability_level',
	},
	{
		label       : 'Blood Group',
		name        : 'blood_group',
		controlType : 'text',
		placeholder : 'Blooed Group',
		value_key   : 'personal_details.blood_group',
	},
	{
		label       : 'Disability Level',
		name        : 'disability_level',
		controlType : 'text',
		placeholder : 'Disability Level',
		value_key   : 'personal_details.disability_level',
	},
	{
		label       : 'Allergies',
		name        : 'allergies',
		controlType : 'text',
		placeholder : 'Allergies',
		value_key   : 'personal_details.allergies',
	},
];

export const MEDIA_CONTROLS = [
	{
		label       : 'Linkedin',
		name        : 'linkedin',
		controlType : 'text',
		placeholder : 'Linkedin Profile Link',
		value_key   : 'personal_details.social_media_links.linkedin',
	},
	{
		label       : 'Github',
		name        : 'github',
		controlType : 'text',
		placeholder : 'Github Profile Link',
		value_key   : 'personal_details.social_media_links.github',
	},
	{
		label       : 'Instagram',
		name        : 'instagram',
		controlType : 'text',
		placeholder : 'Instagram Profile Link',
		value_key   : 'personal_details.social_media_links.instagram',
	},
	{
		label       : 'Twitter',
		name        : 'twitter',
		controlType : 'text',
		placeholder : 'Twitter Profile Link',
		value_key   : 'personal_details.social_media_links.twitter',
	},
	{
		label       : 'Figma',
		name        : 'figma',
		controlType : 'text',
		placeholder : 'Figma Profile Link',
		value_key   : 'personal_details.social_media_links.figma',
	},
	{
		label       : 'Facebook',
		name        : 'facebook',
		controlType : 'text',
		placeholder : 'Facebook Profile Link',
		value_key   : 'personal_details.social_media_links.facebook',
	},
];

export const PREVIOUS_JOB_HISTORY = [
	{
		label       : 'Company Name',
		name        : 'company_name',
		controlType : 'text',
		placeholder : 'Previous Company name',
		value_key   : 'personal_details.previous_job_detail.company_name',
	},
	{
		label       : 'Role',
		name        : 'role',
		controlType : 'text',
		placeholder : 'Enter role at previous company',
		value_key   : 'personal_details.previous_job_detail.role',
	},
	{
		label       : 'Type',
		name        : 'type',
		controlType : 'select',
		options     : [{ label: 'Intern', value: 'intern' }, { label: 'Full-Time', value: 'fulltime' },
			{ label: 'Part-Time', value: 'parttime' },
			{ label: 'Contract', value: 'contract' }],
		placeholder : 'Enter Employment type',
		value_key   : 'personal_details.previous_job_detail.type',
	},
];

export const FAMILY_CONTROLS = [
	{
		label       : 'Father Name',
		name        : 'father_name',
		controlType : 'text',
		placeholder : 'Father Name',
		value_key   : 'personal_details.family_details.father_name',
	},
	{
		label       : 'Mother Name',
		name        : 'mother_name',
		controlType : 'text',
		placeholder : 'Mother Name',
		value_key   : 'personal_details.family_details.mother_name',
	},
	{
		label       : "Father's Phone Number",
		name        : 'father_mobile_number',
		controlType : 'mobile',
		placeholder : "Father's Phone Number",
		value_key   : 'personal_details.family_details.father_mobile_number',
	},
	{
		label       : "Mother's Phone Number",
		name        : 'mother_mobile_number',
		controlType : 'mobile',
		placeholder : "Mother's Phone Number",
		value_key   : 'personal_details.family_details.mother_mobile_number',
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
		isClearable : true,
		value_key   : 'personal_details.family_details.are_parents_senior_citizen',
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
		isClearable : true,
		value_key   : 'personal_details.family_details.Dependent',
	},
	{
		label       : 'Guardian Name',
		name        : 'guardian_name',
		controlType : 'text',
		placeholder : 'Guardian Name',
		value_key   : 'personal_details.family_details.guardian_name',
	},
	{
		label       : 'Guardian Mobile Number',
		name        : 'guardian_mobile_number',
		controlType : 'mobile',
		placeholder : 'Guardian Mobile Number',
		value_key   : 'personal_details.family_details.mother_mobile_number',
	},
	{
		label       : 'Family Physician Name',
		name        : 'family_physician_name',
		controlType : 'text',
		placeholder : 'Family Physician Name',
		value_key   : 'personal_details.family_details.family_physician_name',
	},
	{
		label       : 'Family Physician Mobile Number',
		name        : 'family_physician_mobile_number',
		controlType : 'mobile',
		placeholder : 'Family Physician Mobile Number',
		value_key   : 'personal_details.family_details.family_physician_mobile_number',
	},
];

export const ADDRESS_CONTROLS = [
	{
		label       : 'Address',
		name        : 'address',
		controlType : 'text',
		placeholder : 'Address',
		value_key   : 'employee_detail.present_address.address',
	},
	{
		label       : 'City',
		name        : 'city',
		controlType : 'text',
		placeholder : 'City',
		value_key   : 'employee_detail.present_address.city',
	},
	{
		label       : 'State',
		name        : 'state',
		controlType : 'text',
		placeholder : 'State',
		value_key   : 'employee_detail.present_address.state',
	},
	{
		label       : 'Pincode',
		name        : 'pincode',
		controlType : 'text',
		placeholder : 'pincode',
		value_key   : 'employee_detail.present_address.pincode',
	},
	{
		label       : 'Country',
		name        : 'country',
		controlType : 'text',
		placeholder : 'Country',
		value_key   : 'employee_detail.present_address.country',
	},

];

export const CONTROL_MAPPING = {
	select : SelectController,
	date   : DatepickerController,
	text   : InputController,
	mobile : MobileNumberController,
};
