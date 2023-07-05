const NEGATIVE_VALIDATION_CHECK = 0;
const controls = [
	{
		name               : 'packages',
		type               : 'fieldArray',
		label              : 'Dimension (lxbxh)',
		showButtons        : true,
		showOptional       : false,
		showHeader         : true,
		showDeleteButton   : true,
		noDeleteButtonTill : 1,
		value              : [
			{
				length                : 0,
				width                 : 0,
				height                : 0,
				packing_type          : '',
				handling_type         : '',
				total_packages_weight : '',
				packages_count        : '',
			},
		],
		controls: [
			{
				name         : 'length',
				type         : 'number',
				label        : 'Length (cm)',
				span         : 2,
				className    : 'length',
				showOptional : false,
				rules        : {
					validate: (value) => (value < NEGATIVE_VALIDATION_CHECK ? 'Cannot be Negative' : true),
				},
			},
			{
				name         : 'width',
				type         : 'number',
				label        : 'Width (cm)',
				span         : 2,
				className    : 'width',
				showOptional : false,
				rules        : {
					validate: (value) => (value < NEGATIVE_VALIDATION_CHECK ? 'Cannot be Negative' : true),
				},
			},
			{
				name         : 'height',
				type         : 'number',
				label        : 'Height (cm)',
				span         : 2,
				className    : 'height',
				showOptional : false,
				rules        : {
					validate: (value) => (value < NEGATIVE_VALIDATION_CHECK ? 'Cannot be Negative' : true),
				},
			},
			{
				name    : 'packing_type',
				type    : 'select',
				label   : 'Packing Type',
				span    : 3,
				options : [
					{
						label : 'Pallet',
						value : 'pallet',
					},
					{
						label : 'Box',
						value : 'box',
					},
					{
						label : 'Crate',
						value : 'crate',
					},
					{
						label : 'Loose',
						value : 'loose',
					},
				],
				rules: {
					required: true,
				},
			},
			{
				name    : 'handling_type',
				type    : 'select',
				label   : 'Handling Type',
				span    : 3,
				options : [
					{
						label : 'Stackable',
						value : 'stackable',
					},
					{
						label : 'Non Stackable',
						value : 'non_stackable',
					},
				],
				rules: {
					required: true,
				},
			},
			{
				name         : 'total_packages_weight',
				type         : 'number',
				label        : 'Total Package Weight',
				showOptional : false,
				span         : 6,
				rules        : {
					validate: (value) => (value < NEGATIVE_VALIDATION_CHECK ? 'Cannot be Negative' : true),
				},
			},
			{
				name  : 'packages_count',
				type  : 'number',
				label : 'Package Count',
				span  : 6,
				rules : {
					required : true,
					validate : (value) => (value < NEGATIVE_VALIDATION_CHECK ? 'Cannot be Negative' : true),
				},
			},
		],
	},
	{
		name  : 'weight',
		type  : 'number',
		label : 'Total Weight (kgs)',
		span  : 6,
		rules : {
			required : true,
			validate : (value) => (value < NEGATIVE_VALIDATION_CHECK ? 'Cannot be Negative' : true),
		},
	},
	{
		name  : 'volume',
		type  : 'number',
		label : 'Total Volume (cbm)',
		span  : 6,
		rules : {
			required : true,
			validate : (value) => (value < NEGATIVE_VALIDATION_CHECK ? 'Cannot be Negative' : true),
		},
	},
	{
		name  : 'packages_count',
		type  : 'number',
		label : 'Total Packages Count',
		span  : 6,
		rules : {
			required : true,
			validate : (value) => (value < NEGATIVE_VALIDATION_CHECK ? 'Cannot be Negative' : true),
		},
	},
	{
		name  : 'chargeable_weight',
		type  : 'number',
		label : 'Chargeable Weight',
		span  : 6,
		rules : {
			required : true,
			validate : (value) => (value < NEGATIVE_VALIDATION_CHECK ? 'Cannot be Negative' : true),
		},
	},
];

export default controls;
