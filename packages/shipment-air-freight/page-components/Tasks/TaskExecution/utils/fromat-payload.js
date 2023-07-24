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
	const FINAL_PAYLOAD = {};

	Object.keys(dataToSend || {}).forEach((key) => {
		if (key?.includes('service')) {
			FINAL_PAYLOAD[key] = formatDataForService(
				dataToSend[key],
				rawValues,
				taskData,
				serviceIdMapping,
				primaryService,
			);
		}

		if (key === 'documents') {
			FINAL_PAYLOAD[key] = formatDataForDocuments(
				rawValues,
				taskData,
			);
		}

		if (key === 'shipment') {
			FINAL_PAYLOAD[key] = formatDataForShipment(
				dataToSend[key],
				rawValues,
				taskData,
			);
		}

		if (key === 'container_detail') {
			FINAL_PAYLOAD[key] = rawValues;
		}
	});

	return FINAL_PAYLOAD;
};

export default formatForPayload;
