import removeObjEmptyValue from '../../../../../helpers/removeObjEmptyValue';

const getShipmentUpdateRuleData = ({ values = {} }) => {
	const {
		id = '',
		cogo_entity_id = '',
		organization_id = '',
		rate_source = '',
		trade_type = '',
		organization_type = '',
		organization_sub_type = '',
		shipment_price_slab_config = [],
	} = values || {};
	const slab_details = shipment_price_slab_config?.map((slab) => ({
		...(slab || {}),
		max_allowed_discount_currency : slab?.slab_unit_currency,
		discount_limit_currency       : slab?.slab_unit_currency,
		slab_unit                     : 'shipment_value',
	}));
	const data = {
		slab_details,
		id,
		scope: values?.scope,
		cogo_entity_id,
		organization_id,
		rate_source,
		trade_type,
		organization_type,
		organization_sub_type,
	};
	return removeObjEmptyValue(data);
};

export default getShipmentUpdateRuleData;
