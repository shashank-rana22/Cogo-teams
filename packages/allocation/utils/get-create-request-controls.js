const getControls = () => [
	{
		name    : 'service_type',
		type    : 'radioGroup',
		label   : 'Allocation Type',
		value   : 'organization',
		options : [
			{
				value : 'organization',
				label : 'Organization',
			},
			{
				value : 'partner',
				label : 'Partner',
			},
		],
		rules: { required: true },
	},
	{
		name           : 'organization_id',
		type           : 'asyncSelect',
		label          : 'Organization',
		placeholder    : 'Select Organization',
		defaultOptions : false,
		rules          : { required: true },
		asyncKey       : 'organizations',
		initialCall    : false,
		isClearable	   : true,
		// getModifiedOptions : ({ options }) => options.map((option) => ({
		// 	...options,
		// 	business_name: `${option.business_name}`,
		// })),
	},
	{
		name           : 'organization_user_id',
		type           : 'select',
		label          : 'Organization User',
		placeholder    : 'Select Organization User',
		defaultOptions : false,
		isClearable	   : true,
		rules          : { required: true },
	},
	{
		name           : 'partner_id',
		type           : 'select',
		label          : 'Partner',
		placeholder    : 'Select Partner',
		defaultOptions : false,
		isClearable	   : true,
		rules          : { required: true },
	},
	{
		name           : 'partner_user_id',
		type           : 'select',
		label          : 'Partner User',
		placeholder    : 'Select Partner User',
		defaultOptions : false,
		isClearable	   : true,
		rules          : { required: true },
	},
	{
		name           : 'stakeholder_type',
		label          : 'Stakeholder Type',
		placeholder    : 'Select Stakeholder Type',
		type           : 'multiSelect',
		isClearable    : true,
		options        : [],
		defaultOptions : true,
		rules          : {
			required: true,
		},
	},
	{
		name           : 'stakeholder_id',
		type           : 'select',
		label          : 'Stakeholder',
		isClearable    : true,
		placeholder    : 'Select Stakeholder',
		defaultOptions : false,
		rules          : { required: true },
	},
	{
		name        : 'reason',
		label       : 'Request Reason',
		placeholder : 'Type here...',
		type        : 'text',
		rules       : {
			required: true,
		},
	},
];

export default getControls;
