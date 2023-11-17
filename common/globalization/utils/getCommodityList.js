import { isEmpty } from '@cogoport/utils';

import {
	COMMODITY_NAME_MAPPING,
	FREIGHT_CONTAINER_COMMODITY_MAPPINGS,
	LCL_FRIEGHT_COMMODITIES,
	LOCAL_CONTAINER_COMMODITY_MAPPINGS,
	FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING,
	AIR_FREIGHT_COMMODITIES,
	AIR_LOCAL_COMMODITIES,
	AIR_CUSTOMS_COMMODITIES,
	FTL_COMMODITIES,
	HAZ_CLASSES,
} from '../constants/commodities';

const getCommoditiesDetails = (list = [], isNullValue = true) => {
	const commodities = (list || []).map((item) => {
		const commodityMapping = COMMODITY_NAME_MAPPING[item] || {};

		return {
			label     : commodityMapping.name || 'All Commodities',
			value     : item || (isNullValue ? 'all_commodity' : null),
			is_reefer : commodityMapping.is_reefer || false,
			is_haz    : commodityMapping.is_haz || false,
		};
	});
	return commodities;
};

const getCommodityList = (type, container_type) => {
	const containerType = isEmpty(container_type) ? 'standard' : container_type;

	switch (type) {
		case 'freight':
			return getCommoditiesDetails(FREIGHT_CONTAINER_COMMODITY_MAPPINGS[containerType] || []);
		case 'lcl_freight':
			return getCommoditiesDetails(LCL_FRIEGHT_COMMODITIES);
		case 'local':
			return getCommoditiesDetails(LOCAL_CONTAINER_COMMODITY_MAPPINGS[containerType]);
		case 'fcl_customs':
			return getCommoditiesDetails(
				FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING[containerType],
			);
		case 'fcl_freight':
			return getCommoditiesDetails(FREIGHT_CONTAINER_COMMODITY_MAPPINGS[containerType] || []);
		case 'air_freight':
			return getCommoditiesDetails(AIR_FREIGHT_COMMODITIES);
		case 'air_local':
			return getCommoditiesDetails(AIR_LOCAL_COMMODITIES);
		case 'air_customs':
			return getCommoditiesDetails(AIR_CUSTOMS_COMMODITIES, true);
		case 'ftl_freight':
			return getCommoditiesDetails(FTL_COMMODITIES, true);
		case 'hazardous':
			return getCommoditiesDetails(HAZ_CLASSES, true);
		default:
			return getCommoditiesDetails(
				LOCAL_CONTAINER_COMMODITY_MAPPINGS[containerType],
			);
	}
};

export default getCommodityList;
