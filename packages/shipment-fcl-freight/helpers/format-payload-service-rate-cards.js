export const formatPayloadForSubsidiaryServiceRateCards = ({ code, service_type, services }) => {
	const serviceType = (service_type || '').replace('_service', '');

	const addedService = (services || []).find(
		(service) => service.service_type === service_type,
	);

	const date = new Date();

	const payload = {
		code,
		service_type         : serviceType,
		validity_end         : addedService?.schedule_arrival,
		validity_start       : date,
		location_id          : addedService?.location?.id,
		importer_exporter_id : addedService?.importer_exporter?.id,
		origin_location_id   : addedService?.origin_port_id || addedService?.origin_port?.id
        || addedService?.origin_location?.id || addedService?.origin_airport?.id || undefined,

		destination_location_id: addedService?.destination_port_id || addedService?.destination_port?.id
        || addedService?.destination_location?.id || addedService?.destination_airport?.id,

		container_type      : addedService?.container_type,
		container_size      : addedService?.container_size,
		commodity           : addedService?.commodity,
		service_provider_id : addedService?.service_provider_id || addedService?.service_provider?.id,
		trade_type          : addedService?.trade_type,
	};

	return payload;
};
