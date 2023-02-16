export const getControls = () => [
	{
		name        : 'name',
		label       : 'Name of the Contact',
		type        : 'text',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Contact Name is required' },
	},
	{
		name        : 'email',
		label       : 'Email of the Contact',
		type        : 'text',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Email of the Contact is required' },
	},
	{
		name        : 'mobile_number',
		label       : 'Contact Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Contact Number is required' },
	},
	{
		name        : 'whatsapp_number',
		label       : 'Whatsapp Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Whatsapp Number is required' },
	},
	{
		name        : 'company_role',
		label       : 'Role in Company',
		type        : 'select',
		placeholder : 'Select a role type',
		style       : { flexBasis: '35%' },
		rules       : { required: 'Company Type is required' },
		options:
			[
				{
					label : 'Partner/Owner/Director',
					value : 'i_am_owner',
				},
				{
					label : 'Finance Head',
					value : 'i_am_finance_head',
				},
				{
					label : 'Finance Team Member',
					value : 'i_work_in_finance',
				},
				{
					label : 'Marketing/Sales',
					value : 'i_work_in_marketing_and_sales',
				},
				{
					label : 'Procurement',
					value : 'i_work_in_procurement',
				},
				{
					label : 'Operations',
					value : 'i_work_in_operations',
				},
				{
					label : 'Logistics Manager',
					value : 'i_am_logistics_manager',
				},
				{
					label : 'Other',
					value : 'other',
				},
			],
	},
	{
		name            : 'contact_proof_url',
		showLabel       : false,
		label           : 'Upload Vendor Document Proof (Pan/Aadhar Card)',
		style           : { flexBasis: '100%', marginRight: '0px' },
		type            : 'file',
		themeType       : 'secondary',
		drag            : true,
		uploadIcon      : 'ic-upload',
		onlyURLOnChange : true,
		uploadType      : 'aws',
		rules           : { required: 'Tax Document is required' },
	},
];
