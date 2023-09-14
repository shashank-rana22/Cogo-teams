import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';

const getCommoditiesMapper = ({ service = '', container_type = '' }) => {
	const data = {
		fcl_freight : FREIGHT_CONTAINER_COMMODITY_MAPPINGS,
		lcl_freight : [
			'general',
			'gases-2.1',
			'gases-2.2',
			'gases-2.3',
			'flammable_liquids-3',
			'flammable_solids-4.1',
			'flammable_solids_self_heat-4.2',
			'emit_flammable_gases_with_water-4.3',
			'imo_classes-5.1',
			'toxic_substances-6.1',
			'infectious_substances-6.2',
			'radioactive_material-7',
			'corrosives-8',
			'miscellaneous_dangerous_goods-9',
		],
		air_freight: [
			'general',
			'perishable',
			'live_animals',
			'pharma',
			'harzardous',
			'express',
		],
	};

	if (service === 'fcl_freight') {
		return data[service][container_type];
	}

	return data[service];
};

export default getCommoditiesMapper;
