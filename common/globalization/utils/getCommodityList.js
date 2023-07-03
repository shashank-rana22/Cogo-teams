import { isEmpty } from '@cogoport/utils';

import {
	COMMODITY_NAME_MAPPING,
	FREIGHT_CONTAINER_COMMODITY_MAPPINGS,
	LCL_FRIEGHT_COMMODITIES,
	LOCAL_CONTAINER_COMMODITY_MAPPINGS,
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
			return getCommoditiesDetails(
				LOCAL_CONTAINER_COMMODITY_MAPPINGS[containerType],
				false,
			);
		default: return [];
	}
};

export default getCommodityList;
