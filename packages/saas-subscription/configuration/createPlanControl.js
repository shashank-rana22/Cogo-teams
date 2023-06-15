const createPlanControl = [
	{
		name        : 'organization_id',
		label       : 'Select Organization',
		type        : 'asyncSelect',
		placeholder : 'Select Organization',
		asyncKey    : 'organizations',
		initialCall : true,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'display_name',
		label       : 'Display Name',
		type        : 'text',
		placeholder : 'Enter Display Name',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'description',
		label       : 'Descriptions',
		type        : 'text',
		placeholder : 'Enter Descriptions',
	},
	{
		name   : 'pricing',
		type   : 'pricing',
		config : [
			{
				key   : 'currency',
				title : 'Currency',
				width : '25%',
			},
			{
				key   : 'period',
				title : 'Frequency',
				width : '35%',
			},
			{
				key        : 'price',
				title      : 'Price',
				width      : '40%',
				renderFunc : 'renderPrice',
			},
			{
				key        : 'active',
				title      : '',
				width      : '20%',
				renderFunc : 'renderCheck',
			},
		],
	},
	{
		name  : 'addons',
		type  : 'fieldArray',
		value : [
			{
				product_id : '',
				count      : 0,
				discount   : 0,
			},
		],
		controls: [
			{
				name        : 'product_id',
				type        : 'asyncSelect',
				asyncKey    : 'addon_list',
				placeholder : 'Enter Name',
				size        : 'sm',
				width       : '40%',
				initialCall : true,
				rules       : {
					required: true,
				},
			},
			{
				name        : 'count',
				type        : 'number',
				placeholder : 'Enter count',
				size        : 'sm',
				width       : '25%',
				rules       : {
					required : true,
					min      : {
						value   : -1,
						message : 'Should be greater than or equal to -1',
					},
				},
			},
			{
				name        : 'discount',
				type        : 'number',
				placeholder : 'Enter Discount',
				size        : 'sm',
				width       : '25%',
				rules       : {
					required : true,
					min      : {
						value   : 0,
						message : 'Should be greater than or equal to 0',
					},
				},
			},
		],
	},
];

export default createPlanControl;
