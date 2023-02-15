export const getControls = () => [
	{
		name        : 'contact_name',
		label       : 'Name of the Contact',
		type        : 'text',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Contact Name is required' },
	},
	{
		name        : 'contact_email',
		label       : 'Email of the Contact',
		type        : 'text',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Email of the Contact is required' },
	},
	{
		name        : 'contact_email',
		label       : 'Email of the Contact',
		type        : 'text',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Email of the Contact is required' },
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
];
