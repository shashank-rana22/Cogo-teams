export const getOtherServiceOptions = ({
	shipment_data,
	serviceOptions,
	startCase,
}) => {
	let newOptions = serviceOptions;
	if (shipment_data?.shipment_type === 'ftl_freight') {
		const servicesList =			(shipment_data?.all_services || []).filter(
			(service) => service.service_type !== 'subsidiary_service',
		) || [];
		if (servicesList[0]?.truck_number) {
			newOptions = servicesList.map((service) => ({
				label: `FTL Freight ${
					service?.truck_number ? `(${service?.truck_number})` : ''
				}`,
				value: `${service?.service_type}?${service?.id}`,
			}));
		} else {
			newOptions = [
				{
					label : 'FTL Freight',
					value : `${servicesList[0].service_type}?${servicesList[0].id}`,
				},
			];
		}
	}
	if (shipment_data?.shipment_type === 'ltl_freight') {
		const servicesList =			(shipment_data?.all_services || []).filter(
			(service) => service.service_type !== 'subsidiary_service',
		) || [];

		newOptions = servicesList.map((service) => ({
			label: `LTL Freight ${
				service?.mile_number ? `(${startCase(service?.mile_number)})` : ''
			}`,
			value: `${service?.service_type}?${service?.id}`,
		}));
	}

	if (shipment_data?.shipment_type === 'haulage_freight') {
		if (shipment_data?.all_services?.[0]?.transport_mode === 'trailer') {
			const servicesList =				(shipment_data?.all_services || []).filter(
				(service) => service.trailer_number !== null,
			) || [];
			if (servicesList.length > 0) {
				newOptions = servicesList.map((service) => ({
					label : `Haulage Freight (${service?.trailer_number})`,
					value : `haulage_freight_service?${service?.id}`,
				}));
			} else {
				newOptions = [
					{
						label : 'Haulage Freight',
						value : `haulage_freight_service?${shipment_data?.all_services?.[0]?.id}`,
					},
				];
			}
		}
	}

	return newOptions;
};
