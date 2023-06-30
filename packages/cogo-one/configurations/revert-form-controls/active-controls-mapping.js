export const SERVICE_CONTROLS_MAPPING = {
	fcl_freight_service: ['sourced_by_id', 'shipping_line_id', 'validity_end', 'remarks', 'currency', 'price',
		'supplier_contract_no', 'schedule_type'],
	lcl_freight_service: ['sourced_by_id', 'validity_end',
		'remarks', 'currency', 'price', 'supplier_contract_no'],
	air_freight_service: [
		'sourced_by_id', 'airline_id',
		'chargeable_weight', 'currency',
		'price', 'price_type', 'operation_type', 'supplier_contract_no', 'validity_end', 'rate_procurement_proof',
		'remarks', 'min_price', 'weight_slabs',
	],
	ltl_freight_service     : [],
	ftl_freight_service     : [],
	haulage_freight_service : [],
	trailer_freight_service : [],
	air_customs_service     : [],
	fcl_customs_service     : [],
};
