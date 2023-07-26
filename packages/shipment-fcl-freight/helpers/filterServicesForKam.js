const IMPORTER_EXPORTER_OBJ_MAPPING = {
	booking_agent             : 'importer_exporter',
	origin_booking_agent      : 'consignee_shipper',
	destination_booking_agent : 'consignee_shipper',
};

const SERVICES_TO_BE_FILTERED_FOR = ['booking_agent', 'destination_booking_agent', 'origin_booking_agent'];

export default function filterServicesForKam({ services = [], shipment_data = {} }) {
	const { stakeholders = [] } = shipment_data || {};

	const stakeholderToFilter = stakeholders?.find?.(
		(stakeholder) => SERVICES_TO_BE_FILTERED_FOR.includes(stakeholder.stakeholder_type),
	);

	if (!stakeholderToFilter) {
		return services;
	}

	const id_to_match = shipment_data?.[IMPORTER_EXPORTER_OBJ_MAPPING[stakeholderToFilter]]?.id;

	const filteredServices = (services || []).filter(
		(service) => service?.importer_exporter?.id === id_to_match,
	);

	return filteredServices;
}
