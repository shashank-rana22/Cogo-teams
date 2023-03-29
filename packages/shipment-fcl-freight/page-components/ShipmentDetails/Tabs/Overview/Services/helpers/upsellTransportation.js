const upsellTransportation = (serviceObj, primary_service) => {
	let cancelUpsellOriginFor = '';
	let cancelUpsellDestinationFor = '';
	const checkForServices = [
		'ftl_freight_service',
		'trailer_freight_service',
		'ltl_freight_service',
	];

	const mainService = primary_service?.service_type;

	serviceObj.originServices.forEach((ele) => {
		if (ele?.display_name) {
			if (checkForServices.includes(ele?.display_service_type)) {
				if (ele?.display_service_type === 'ftl_freight_service') {
					if (mainService === 'fcl_freight_service') {
						cancelUpsellOriginFor = 'trailer_freight_service';
					} else cancelUpsellOriginFor = 'ltl_freight_service';
				} else cancelUpsellOriginFor = 'ftl_freight_service';
			}
		}
	});
	serviceObj.destinationServices.forEach((ele) => {
		if (ele?.display_service_type) {
			if (checkForServices.includes(ele?.display_service_type)) {
				if (ele?.display_service_type === 'ftl_freight_service') {
					if (mainService === 'fcl_freight_service') {
						cancelUpsellDestinationFor = 'trailer_freight_service';
					} else cancelUpsellDestinationFor = 'ltl_freight_service';
				} else cancelUpsellDestinationFor = 'ftl_freight_service';
			}
		}
	});

	return {
		cancelUpsellOriginFor,
		cancelUpsellDestinationFor,
	};
};

export default upsellTransportation;
