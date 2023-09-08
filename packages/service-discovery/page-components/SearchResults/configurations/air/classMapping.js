const CLASS_MAPPING = {
	'Class 1.1': {
		class_id          : '1',
		class_description : 'explosives',
		subclass_id       : '1.1',
		subclass_codes    : [],
		commodity         : 'hazardous',
	},
	'Class 1.2': {
		class_id          : '1',
		class_description : 'explosives',
		subclass_id       : '1.2',
		subclass_codes    : [],
		commodity         : 'hazardous',
	},
	'Class 1.3': {
		class_id          : '1',
		class_description : 'explosives',
		subclass_id       : '1.3',
		subclass_codes    : ['C', 'G'],
		commodity         : 'hazardous',
	},
	'Class 1.3 (F or H or J or K or L)': {
		class_id          : '1',
		class_description : 'explosives',
		subclass_id       : '1.3',
		subclass_codes    : ['F', 'H', 'J', 'K', 'L'],
		commodity         : 'hazardous',
	},
	'Class 1.4': {
		class_id          : '1',
		class_description : 'explosives',
		subclass_id       : '1.4',
		subclass_codes    : ['B', 'C', 'D', 'E', 'G'],
		commodity         : 'hazardous',
	},
	'Class 1.4 (S)': {
		class_id          : '1',
		class_description : 'explosives',
		subclass_id       : '1.4',
		subclass_codes    : ['S'],
		commodity         : 'hazardous',
	},
	'Class 1.4 (F)': {
		class_id          : '1',
		class_description : 'explosives',
		subclass_id       : '1.4',
		subclass_codes    : ['F'],
		commodity         : 'hazardous',
	},
	'Class 1.5': {
		class_id          : '1',
		class_description : 'explosives',
		subclass_id       : '1.5',
		subclass_codes    : [],
		commodity         : 'hazardous',
	},
	'Class 1.6': {
		class_id          : '1',
		class_description : 'explosives',
		subclass_id       : '1.6',
		subclass_codes    : [],
		commodity         : 'hazardous',
	},

	'Class 2.1': {
		class_id          : '2',
		class_description : 'gases',
		subclass_id       : '2.1',
		subclass_codes    : [],
		commodity         : 'gases-2.1',
	},
	'Class 2.2': {
		class_id          : '2',
		class_description : 'gases',
		subclass_id       : '2.2',
		subclass_codes    : [],
		commodity         : 'gases-2.2',
	},
	'Class 2.3': {
		class_id          : '2',
		class_description : 'gases',
		subclass_id       : '2.3',
		subclass_codes    : [],
		commodity         : 'gases-2.3',
	},

	'Class 3': {
		class_id          : '3',
		class_description : 'flammable_liquids',
		subclass_id       : '3.0',
		subclass_codes    : [],
		commodity         : 'flammable_liquids-3',
	},

	'Class 4.1': {
		class_id          : '4',
		class_description : 'flammable_solids',
		subclass_id       : '4.1',
		subclass_codes    : [],
		commodity         : 'flammable_solids-4.1',
	},
	'Class 4.2': {
		class_id          : '4',
		class_description : 'flammable_solids',
		subclass_id       : '4.2',
		subclass_codes    : [],
		commodity         : 'flammable_solids_self_heat-4.2',
	},
	'Class 4.3': {
		class_id          : '4',
		class_description : 'flammable_solids',
		subclass_id       : '4.3',
		subclass_codes    : [],
		commodity         : 'emit_flammable_gases_with_water-4.3',
	},

	'Class 5.1': {
		class_id          : '5',
		class_description : 'oxidizing_substances_and_organic_peroxides',
		subclass_id       : '5.1',
		subclass_codes    : [],
		commodity         : 'imo_classes-5.1',
	},
	'Class 5.2': {
		class_id          : '5',
		class_description : 'oxidizing_substances_and_organic_peroxides',
		subclass_id       : '5.2',
		subclass_codes    : [],
		commodity         : 'hazardous',
	},

	'Class 6.1': {
		class_id          : '6',
		class_description : 'toxic_and_infectious_substances',
		subclass_id       : '6.1',
		subclass_codes    : [],
		commodity         : 'toxic_substances-6.1',
	},
	'Class 6.2': {
		class_id          : '6',
		class_description : 'toxic_and_infectious_substances',
		subclass_id       : '6.2',
		subclass_codes    : [],
		commodity         : 'infectious_substances-6.2',
	},

	'Class 7': {
		class_id          : '7',
		class_description : 'radioactive_material',
		subclass_id       : '7.0',
		subclass_codes    : [],
		commodity         : 'radioactive_material-7',
	},

	'Class 8': {
		class_id          : '8',
		class_description : 'corrosives_liquids/solids',
		subclass_id       : '8.0',
		subclass_codes    : [],
		commodity         : 'corrosives-8',
	},

	'Class 9': {
		class_id          : '9',
		class_description : 'miscellaneous_dangerous_substances_and_articles',
		subclass_id       : '9.0',
		subclass_codes    : [],
		commodity         : 'miscellaneous_dangerous_goods-9',
	},
};

export default CLASS_MAPPING;
