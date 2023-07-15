export const controls = [
	{
		name        : 'incidentType',
		label       : 'Incident Type',
		type        : 'select',
		placeholder : 'Select Incident Type',
		isClearable : true,
		span        : 6,
		options     : [
			{
				label : 'Organization',
				value : 'ORGANIZATION',
			},
			{
				label : 'Business Finance',
				value : 'BUSINESS_FINANCE',
			},
			{
				label : 'Common',
				value : 'COMMON',
			},
			{
				label : 'Admin UI',
				value : 'ADMIN_UI',
			},
			{
				label : 'Public UI',
				value : 'PUBLIC_UI',
			},
		],
		rules: { required: 'Incident Type is required' },
	},
	{
		name        : 'incidentSubtype',
		label       : 'Incident Subtype',
		type        : 'select',
		span        : 5.5,
		isClearable : true,
		options     : [
			{
				label : 'HINDI',
				value : 'HI',
			},
			{
				label : 'VIETNAMESE',
				value : 'VI',
			},
			{
				label : 'ENGLISH',
				value : 'EN',
			},
		],
		placeholder : 'Incident Subtype',
		rules       : { required: 'Incident Subtype is required' },
	},
	{
		name        : 'approvalType',
		label       : 'Approval Type',
		placeholder : 'Approval Type',
		span        : 12,
		type        : 'select',
		options     : [
			{
				label : 'HINDI',
				value : 'HI',
			},
			{
				label : 'VIETNAMESE',
				value : 'VI',
			},
			{
				label : 'ENGLISH',
				value : 'EN',
			},
		],
		rules: { required: 'Approval Type is required' },
	},
	{
		name        : 'entityCode',
		label       : 'Entity Code',
		type        : 'select',
		size        : 'lg',
		span        : 12,
		placeholder : 'Enter Text',
		options     : [
			{
				label : 'HINDI',
				value : 'HI',
			},
			{
				label : 'VIETNAMESE',
				value : 'VI',
			},
			{
				label : 'ENGLISH',
				value : 'EN',
			},
		],
		rules: { required: 'EntityCode is required' },
	},
];
