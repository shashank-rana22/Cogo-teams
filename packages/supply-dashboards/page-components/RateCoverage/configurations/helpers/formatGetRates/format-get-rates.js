import formatAirCustoms from './format-air-customs';
import formatAirFreightLocal from './format-air-local-rates';
import formatFclCustoms from './format-fcl-customs';
import formatFclFreightRate from './format-fcl-freight-rate';
import formatFclFreightLocal from './format-fcl-local-rates';
import formatFtlFreightRate from './format-ftl-freight';
import formatHaulageFreightRate from './format-haulage-freight-rate';
import formatLclCustoms from './format-lcl-customs-rates';
import formatLclFreightRate from './format-lcl-freight-rate';
import formatLtlFreightRate from './format-ltl-freight';
import formatTrailerFreight from './format-trailer-freight';

const formatGetRates = ({ payload, charge, fields, trade_type }) => {
	let newPayload = {};
	if (charge === 'fcl_freight_local') {
		newPayload = formatFclFreightLocal({ payload, trade_type });
	} else if (charge === 'fcl_freight') {
		newPayload = formatFclFreightRate({ fields });
	} else if (charge === 'air_freight_local') {
		newPayload = formatAirFreightLocal({ payload, trade_type });
	} else if (charge === 'haulage_freight') {
		newPayload = formatHaulageFreightRate({ fields });
	} else if (charge === 'ltl_freight') {
		newPayload = formatLtlFreightRate({ fields });
	} else if (charge === 'ftl_freight') {
		newPayload = formatFtlFreightRate({ fields });
	} else if (charge === 'fcl_customs') {
		newPayload = formatFclCustoms({ fields });
	} else if (charge === 'air_customs') {
		newPayload = formatAirCustoms({ fields });
	} else if (charge === 'trailer_freight') {
		newPayload = formatTrailerFreight({ fields });
	} else if (charge === 'lcl_customs') {
		newPayload = formatLclCustoms({ fields });
	} else if (charge === 'lcl_freight') { newPayload = formatLclFreightRate({ fields }); }
	return newPayload;
};
export default formatGetRates;
