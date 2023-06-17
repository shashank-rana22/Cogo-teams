import { getByKey } from '@cogoport/utils';

const NUMBER_KEYS = ['bls_count', 'volume', 'weight', 'packages_count'];

const DEFAULT_NUMBER_VALUE = 1;

const extraParamsToMerge = (values) => {
	if (values?.dimension) {
		const { dimension = [] } = values || {};

		let total_volume = 0;

		(dimension || [])?.forEach((dimensionObj) => {
			total_volume
				+= Number(dimensionObj?.length)
				* Number(dimensionObj?.breadth)
				* Number(dimensionObj?.height);
		});

		return { volume: total_volume };
	}

	return {};
};

const formatDataForService = (
	dataToSend,
	rawValues,
	taskData,
	serviceIdMapping,
) => {
	const payloadObj = {};

	(dataToSend || []).forEach((sendKeyObj) => {
		if (sendKeyObj?.source === 'taskData') {
			payloadObj[sendKeyObj?.key] = taskData?.[sendKeyObj?.key_from_source];
		}

		if (sendKeyObj?.source === 'serviceData') {
			if (sendKeyObj.custom_service_id) {
				payloadObj[sendKeyObj.key] = serviceIdMapping[`${sendKeyObj.custom_service_id}.id`];
			} else {
				payloadObj[sendKeyObj?.key] = taskData?.service_type
					? serviceIdMapping?.[`${taskData?.service_type}.id`]
					: serviceIdMapping?.[`${taskData?.shipment_type}_service.id`];
			}
		}

		if (sendKeyObj?.source === 'formData') {
			if (NUMBER_KEYS.includes(sendKeyObj?.key)) {
				payloadObj[sendKeyObj?.key] = Number(rawValues?.[sendKeyObj?.key_from_source] || DEFAULT_NUMBER_VALUE);
			} else {
				payloadObj[sendKeyObj.key] = getByKey(
					rawValues,
					sendKeyObj.key_from_source,
					undefined,
				);
			}
		}
	});

	const extraParams = extraParamsToMerge(rawValues);

	const finalPayloadObj = { ...payloadObj, ...extraParams };

	return finalPayloadObj;
};

export default formatDataForService;
