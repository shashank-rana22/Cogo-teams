export const DANGEROUS_COMMODITY_OPTIONS = [
	{
		label   : 'Class 1—Explosives',
		options : [
			{
				label : 'Class 1.1',
				value : 'Class 1.1',
			},
			{
				label : 'Class 1.2',
				value : 'Class 1.2',
			},
			{
				label : 'Class 1.3 (C or G)',
				value : 'Class 1.3',
			},
			{
				label : 'Class 1.3 (F or H or J or K or L)',
				value : 'Class 1.3 (F or H or J or K or L)',
			},
			{
				label : 'Class 1.4 (B or C or D or E or G)',
				value : 'Class 1.4',
			},
			{
				label : 'Class 1.4 (S)',
				value : 'Class 1.4 (S)',
			},
			{
				label : 'Class 1.4 (F)',
				value : 'Class 1.4 (F)',
			},
			{
				label : 'Class 1.5',
				value : 'Class 1.5',
			},
			{
				label : 'Class 1.6',
				value : 'Class 1.6',
			},
		],
	},
	{
		label   : 'Class 2—Gases',
		options : [
			{
				label : 'Class 2.1 (Flammable Gases)',
				value : 'Class 2.1',
			},
			{
				label : 'Class 2.2 (Non-Flammable, Non-Toxic Gases)',
				value : 'Class 2.2',
			},
			{
				label : 'Class 2.3 (Toxic Gases)',
				value : 'Class 2.3',
			},
		],
	},
	{
		label   : 'Class 3—Flammable Liquids',
		options : [
			{
				label : 'Class 3',
				value : 'Class 3',
			},
		],
	},
	{
		label   : 'Class 4—Flammable Solids',
		options : [
			{
				label : 'Class 4.1 (Flammable Solid)',
				value : 'Class 4.1',
			},
			{
				label : 'Class 4.2 (Spontaneously Combustible)',
				value : 'Class 4.2',
			},
			{
				label : 'Class 4.3 (Dangerous When Wet)',
				value : 'Class 4.3',
			},
		],
	},
	{
		label   : 'Class 5—Oxidizing Substances and Organic Peroxides',
		options : [
			{
				label : 'Class 5.1 (Oxidizing Substances)',
				value : 'Class 5.1',
			},
			{
				label : 'Class 5.2 (Organic Peroxide)',
				value : 'Class 5.2',
			},
		],
	},
	{
		label   : 'Class 6—Toxic and Infectious Substances',
		options : [
			{
				label : 'Class 6.1 (Toxic Liquids/Solids)',
				value : 'Class 6.1',
			},
			{
				label : 'Class 6.2 (Biological Substances)',
				value : 'Class 6.2',
			},
		],
	},
	{
		label   : 'Class 7—Radioactive Material',
		options : [
			{
				label : 'Class 7',
				value : 'Class 7',
			},
		],
	},
	{
		label   : 'Class 8—Corrosives Liquids/Solids',
		options : [
			{
				label : 'Class 8',
				value : 'Class 8',
			},
		],
	},
	{
		label:
			'Class 9—Miscellaneous Dangerous Substances and Articles, Including Environmentally Hazardous Substances',
		options: [
			{
				label : 'Class 9',
				value : 'Class 9',
			},
		],
	},
];

export const TEMP_CONTROLLED_RANGE_OPTIONS = [
	{
		label   : 'Active Temperature Controlled',
		options : [
			{
				label : 'General Pharma',
				value : 'active_general_pharma',
			},
			{
				label : 'Chilled: 2-8 degree Celsius',
				value : 'active_chilled',
			},
			{
				label : 'Ambient: 15-25 degree Celsius',
				value : 'active_ambient',
			},
			{
				label : 'Frozen: 0 to -20 degree Celsius',
				value : 'active_frozen',
			},
		],
	},
	{
		label   : 'Passive Temperature Controlled',
		options : [
			{
				label : 'General Pharma',
				value : 'passive_general_pharma',
			},
			{
				label : 'Chilled: 2-8 degree Celsius',
				value : 'passive_chilled',
			},
			{
				label : 'Ambient: 15-25 degree Celsius',
				value : 'passive_ambient',
			},
			{
				label : 'Frozen: 0 to -20 degree Celsius',
				value : 'passive_frozen',
			},
		],
	},
];

export const OTHER_SPECIAL_INTERNATIONAL_OPTIONS = [
	{ label: 'Perishable', value: 'perishable' },
	{ label: 'Valuables', value: 'valuables' },
	{ label: 'Fragile', value: 'fragile' },
	{ label: 'Others', value: 'others' },
];
