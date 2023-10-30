import removeObjEmptyValue from '../../../../../helpers/removeObjEmptyValue';

const getShipmentCreateRuleData = ({ values = {} }) => {
	const {
		shipment_price_slab_config = [],
		category = '',
		...restValues
	} = values || {};
	const nonEmptyValues = removeObjEmptyValue(restValues);
	const slab_details = shipment_price_slab_config?.map((slab) => ({
		...slab,
		max_allowed_discount_currency : slab.slab_unit_currency,
		discount_limit_currency       : slab.slab_unit_currency,
		slab_unit                     : 'shipment_value',
	}));
	return {
		...nonEmptyValues,
		applicable_at: [
			'promotion_creation',
			'negative_margin_applicability',
			'promotion_consumption',
		],
		category : [category],
		slab_details,
		scope    : values?.scope,
	};
};

export default getShipmentCreateRuleData;
