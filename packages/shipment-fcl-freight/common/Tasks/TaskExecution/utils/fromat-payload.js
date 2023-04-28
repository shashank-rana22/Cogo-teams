import formatDataForDocuments from './format-documents-data-payload';
import formatDataForService from './format-service-data-payload';
import formatDataForShipment from './format-shipment-data-payload';

const formatForPayload = (
	rawValues,
	taskData,
	dataToSend,
	serviceIdMapping,
	primaryService = {},
) => {
	const finalPayload = {};

	Object.keys(dataToSend || {}).forEach((key) => {
		if (key.includes('service')) {
			finalPayload[key] = formatDataForService(
				dataToSend[key],
				rawValues,
				taskData,
				serviceIdMapping,
				primaryService,
			);
		}
		if (key === 'documents') {
			finalPayload[key] = formatDataForDocuments(
				rawValues,
				taskData,
			);
		}
		if (key === 'shipment') {
			finalPayload[key] = formatDataForShipment(
				dataToSend[key],
				rawValues,
				taskData,
			);
		}
		if (key === 'container_detail') {
			finalPayload[key] = rawValues;
		}
	});
	return finalPayload;
};

export default formatForPayload;
