import formatDataForDocuments from './format-documents-data-payload';
import formatDataForService from './format-service-data-payload';
import formatDataForShipment from './format-shipment-data-payload';
import formatDataForContainer from './formatDataForContainer';

const formatForPayload = (
	rawValues,
	taskData,
	dataToSend,
	serviceIdMapping,
	ROLLOVER_TASKS,
	primaryService = {},
) => {
	const FINAL_PAYLOAD = {};

	Object.keys(dataToSend || {}).forEach((key) => {
		if (key?.includes('service')) {
			FINAL_PAYLOAD[key] = formatDataForService({
				dataToSend: dataToSend[key],
				rawValues,
				taskData,
				serviceIdMapping,
				primaryService,
			});
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
			FINAL_PAYLOAD[key] = formatDataForContainer(rawValues, taskData, ROLLOVER_TASKS);
		}
	});

	return FINAL_PAYLOAD;
};

export default formatForPayload;
