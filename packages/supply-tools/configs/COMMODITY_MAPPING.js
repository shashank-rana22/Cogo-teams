export const COMMODITY_OPTIONS_MAPPING = {
	standard: [
		{
			label : 'General',
			value : 'general',
		},
		{
			label : 'White Goods',
			value : 'white_goods',
		},
		{
			label : 'PTA',
			value : 'pta',
		},
		{
			label : 'Cotton and yarn',
			value : 'cotton_and_yarn',
		},
		{
			label : 'Fabric and textiles',
			value : 'fabric_and_textiles',
		},
		{
			label : 'Sugar Rice',
			value : 'sugar_rice',
		},
		{
			label : 'Gases 2.1',
			value : 'gases-2.1',
		},
		{
			label : 'Gases 2.2',
			value : 'gases-2.2',
		},
		{
			label : 'Gases 2.3',
			value : 'gases-2.3',
		},
		{
			label : 'Flammable Liquids 3',
			value : 'flammable_liquids-3',
		},
		{
			label : 'Flammable Solids 4.1',
			value : 'flammable_solids-4.1',
		},
		{
			label : 'Flammable Solids Self Heat 4.2',
			value : 'flammable_solids_self_heat-4.2',
		},
		{
			label : 'IMO Classes 5.1',
			value : 'imo_classes-5.1',
		},
		{
			label : 'Toxic Substances 6.1',
			value : 'toxic_substances-6.1',
		},
		{
			label : 'Infectious Substances 6.2',
			value : 'infectious_substances-6.2',
		},
		{
			label : 'Radioactive Material 7',
			value : 'radioactive_material-7',
		},
		{
			label : 'Corrosives 8',
			value : 'corrosives-8',
		},
		{
			label : 'Miscellaneous Dangerous Goods 9',
			value : 'miscellaneous_dangerous_goods-9',
		},
	],

	refer: [
		{
			label : 'Chilled',
			value : 'chilled',
		},
		{
			label : 'Frozen',
			value : 'frozen',
		},
		{
			label : 'Pharma',
			value : 'pharma',
		},
	],
	open_top: [
		{
			label : 'In Gauge Cargo',
			value : 'in_gauge_cargo',
		},
	],
	flat_rack: [
		{
			label : 'In Gauge Cargo',
			value : 'in_gauge_cargo',
		},
	],
	iso_tank: [
		{
			label : 'Non Hazardous Solids',
			value : 'non_haz_solids',
		},
		{
			label : 'Non Hazardous Gases',
			value : 'non_haz_gases',
		},
		{
			label : 'Non Hazardous Liquids',
			value : 'non_haz_liquids',
		},
		{
			label : 'Gases 2.1',
			value : 'gases-2.1',
		},
		{
			label : 'Gases 2.2',
			value : 'gases-2.2',
		},
		{
			label : 'Gases 2.3',
			value : 'gases-2.3',
		},
		{
			label : 'Flammable Liquids 3',
			value : 'flammable_liquids-3',
		},
		{
			label : 'Flammable Solids 4.1',
			value : 'flammable_solids-4.1',
		},
		{
			label : 'Flammable Solids Self Heat 4.2',
			value : 'flammable_solids_self_heat-4.2',
		},
		{
			label : 'IMO Classes 5.1',
			value : 'imo_classes-5.1',
		},
		{
			label : 'Toxic Substances 6.1',
			value : 'toxic_substances-6.1',
		},
		{
			label : 'Infectious Substances 6.2',
			value : 'infectious_substances-6.2',
		},
		{
			label : 'Radioactive Material 7',
			value : 'radioactive_material-7',
		},
		{
			label : 'Corrosives 8',
			value : 'corrosives-8',
		},
		{
			label : 'Miscellaneous Dangerous Goods 9',
			value : 'miscellaneous_dangerous_goods-9',
		},
	],
	open_side: [
		{
			label : 'General',
			value : 'general',
		},
	],
};

const getOptions = ({ containerType }) => COMMODITY_OPTIONS_MAPPING[containerType];

export default getOptions;
