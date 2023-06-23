import { useEffect, useState } from 'react';

const MIN_CHARGEABLE_WEIGHT = 45;
const MAX_WEIGHT_SLAB = 500;

const ActiveControlsMapping = ({ isChargeableWeight }) => {
	const airServiceField = [
		'sourced_by_id', 'airline_id',
		'chargeable_weight', 'currency',
		'price', 'price_type', 'operation_type', 'supplier_contract_no', 'validity_end', 'rate_procurement_proof',
		'remarks', 'min_price', 'weight_slabs',
	];
	const [airFreightService, setAirFreightService] = useState(airServiceField);

	useEffect(() => {
		setAirFreightService((prevAirFreightService) => {
			let updatedService = prevAirFreightService;

			if (isChargeableWeight > MIN_CHARGEABLE_WEIGHT) {
				updatedService = updatedService.filter((item) => item !== 'min_price');
			} else {
				updatedService = [...updatedService, 'min_price'];
			}

			if (isChargeableWeight > MAX_WEIGHT_SLAB) {
				updatedService = updatedService.filter((item) => item !== 'weight_slabs');
			} else {
				updatedService = [...updatedService, 'weight_slabs'];
			}

			return updatedService;
		});
	}, [isChargeableWeight]);

	const serviceControlsMapping = {
		fcl_freight_service: ['sourced_by_id', 'shipping_line_id', 'validity_end', 'remarks', 'currency', 'price',
			'supplier_contract_no'],
		lcl_freight_service: ['sourced_by_id', 'validity_end',
			'remarks', 'currency', 'price', 'supplier_contract_no'],
		air_freight_service     : airFreightService,
		ltl_freight_service     : [],
		ftl_freight_service     : [],
		haulage_freight_service : [],
		trailer_freight_service : [],
		air_customs_service     : [],
		fcl_customs_service     : [],
	};
	return serviceControlsMapping;
};

export default ActiveControlsMapping;
