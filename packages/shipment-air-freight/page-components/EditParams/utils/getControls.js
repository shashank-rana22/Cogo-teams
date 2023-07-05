const controls = [
	{
		name     : 'packages',
		type     : 'fieldArray',
		label    : 'Dimension (lxbxh)',
		controls : [
			{
				name      : 'length',
				type      : 'number',
				label     : 'Length',
				span      : 1,
				className : 'length',
			},
			{
				name      : 'width',
				type      : 'number',
				label     : 'Width',
				span      : 1,
				className : 'width',
			},
			{
				name      : 'height',
				type      : 'number',
				label     : 'Height',
				span      : 1,
				className : 'height',
			},
			{
				name    : 'packing_type',
				type    : 'select',
				label   : 'Packing Type',
				span    : 2,
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
					{
						label : 'Carton',
						value : 'carton',
					},
					{
						label : 'Roll',
						value : 'roll',
					},
					{
						label : 'Drum',
						value : 'drum',
					},
					{
						label : 'Bag',
						value : 'bag',
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
				span    : 2,
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
				name  : 'total_packages_weight',
				type  : 'number',
				label : 'Total Package Weight',
				span  : 3,
			},
			{
				name  : 'packages_count',
				type  : 'number',
				label : 'Package Count',
				span  : 2,
				rules : {
					required: true,
				},
			},
		],
	},
	{
		name  : 'packages_count',
		label : 'Packages Count',
		type  : 'number',
		rules : {
			min      : 1,
			required : 'Packages count is required',
		},
	},
	{
		name  : 'weight',
		label : 'Weight (Kgs)',
		type  : 'number',
		rules : {
			min      : 0.000001,
			required : 'Weight is required',
		},
	},
	{
		name  : 'volume',
		label : 'Volume',
		type  : 'number',
		rules : {
			min      : 0.000001,
			required : 'Volume is required',
		},
	},
	{
		name  : 'chargeable_weight',
		type  : 'number',
		label : 'Chargeable Weight',
		rules : {
			required : true,
			min      : 0.000001,
		},
	},
];

export default function getControls({ service }) {
	const { id, packages, service_type, packages_count, weight, volume, chargeable_weight } = service || {};

	const defaultValues = {
		service_id        : id,
		service_type,
		packages,
		packages_count    : Number(packages_count),
		weight            : Number(weight),
		volume            : Number(volume),
		chargeable_weight : Number(chargeable_weight),
	};

	return { controls, defaultValues };
}
