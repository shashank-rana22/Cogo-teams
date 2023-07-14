import getLocationDetails from '../utils/getLocationDetails';
import isSingleLocation from '../utils/isSingleLocation';

const getShipmentActivityDetails = ({ serviceData = '', eventType = '' }) => {
	const {
		primary_service,
		services,
	} = serviceData?.detail || {};

	const primaryService = Object.values(services || {}).find(
		(service) => service?.service_type === primary_service || !service?.trade_type,
	);

	const origin = getLocationDetails(primaryService || {}, 'origin');

	const destination = !isSingleLocation(primaryService?.service_type)
		? getLocationDetails(primaryService || {}, 'destination')
		: null;

	// const primary_services = [];

	// services?.forEach((service) => {
	// 	if (service.service_type === primaryService.service_type) {
	// 		primary_services.push(service);
	// 	}
	// });

	const { shipping_line = {} } = primaryService || {};

	const checkoutData = {
		shippingLineUrl  : shipping_line?.logo_url,
		shippingLineName : shipping_line?.business_name,
		destinationPort  : destination,
		originPort       : origin,

	};

	const EVENT_DETAILS_MAPPING = {
		checkout: checkoutData,
	};
	const eventDetails = EVENT_DETAILS_MAPPING[eventType] || null;

	return eventDetails;
};

export default getShipmentActivityDetails;
