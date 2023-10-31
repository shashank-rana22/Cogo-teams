import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';
import {
	FREIGHT_CONTAINER_COMMODITY_MAPPINGS,
	LCL_FRIEGHT_COMMODITIES,
	FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING,
	AIR_LOCAL_COMMODITIES,
} from '@cogoport/globalization/constants/commodities';
import { startCase } from '@cogoport/utils';

import { currencyOptions } from '../configurations/helpers/constants';

const COMMODITY_MAPPINGS = {
	freight     : FREIGHT_CONTAINER_COMMODITY_MAPPINGS,
	lcl_freight : LCL_FRIEGHT_COMMODITIES,
	fcl_customs : FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING,
	air_local   : AIR_LOCAL_COMMODITIES,
};

const TRADE_TYPES = ['import', 'export'];

const formatOptions = (options) => options.map((value) => ({
	label: (value || 'All Commodities').split('-')
		.map((str) => parseFloat(str) || startCase(str)).join(' '),
	value: value || 'general',
}));

const getOptions = (key, control, values) => {
	let options = [];
	const mapping = COMMODITY_MAPPINGS[control.commodityType];

	switch (key) {
		case 'currencies':
			options = currencyOptions;
			break;
		case 'container-types':
			options = containerTypes;
			break;
		case 'container-sizes':
			options = containerSizes;
			break;
		case 'commodities':
			options = formatOptions(Array.isArray(mapping)
				? mapping
				: mapping[values[control?.containerTypeKey || 'container_type']]);

			break;
		case 'trade-types':
			options = formatOptions(TRADE_TYPES);
			break;
		default:
			break;
	}

	return options;
};

export default getOptions;
