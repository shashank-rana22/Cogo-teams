import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { MAX_WEIGHT_SLAB } from '../constants';

const getWeightSlabs = ({ values }) => {
	const { price = 0, currency = '', weight_slabs = [] } = values || {};
	const { lower_limit = '', upper_limit = '' } = weight_slabs[GLOBAL_CONSTANTS.zeroth_index];

	return [{
		currency,
		tariff_price : Number(price),
		unit         : 'per_kg',
		lower_limit  : Number(lower_limit),
		upper_limit  : Number(upper_limit),
	}];
};

const getAirServicePayload = ({ values, chargeableWeight }) => ({
	chargeable_weight          : Number(values?.chargeable_weight) || undefined,
	operation_type             : values.operation_type || undefined,
	airline_id                 : values.airline_id || undefined,
	price_type                 : values.price_type || undefined,
	weight_slabs               : chargeableWeight < MAX_WEIGHT_SLAB ? getWeightSlabs({ values }) : undefined,
	rate_procurement_proof_url : values.rate_procurement_proof?.finalUrl || undefined,
});

const getFclServicePayload = ({ values }) => ({
	shipping_line_id : values.shipping_line_id || undefined,
	schedule_type    : values.schedule_type || undefined,
});

const ACTIVE_SERVICE_PAYLOAD = {
	air_freight_service : getAirServicePayload,
	fcl_freight_service : getFclServicePayload,
};

const getPayload = ({ lineItemsParams, values = {}, id, service_type = '', chargeableWeight = 0 }) => ({
	line_items           : lineItemsParams,
	is_reverted          : true,
	id,
	supplier_contract_no : values.supplier_contract_no || undefined,
	validity_end         : values.validity_end || undefined,
	sourced_by_id        : values.sourced_by_id,
	remarks              : values.remarks || undefined,
	...(ACTIVE_SERVICE_PAYLOAD[service_type]?.({ values, chargeableWeight }) || {}),

});

export default getPayload;
