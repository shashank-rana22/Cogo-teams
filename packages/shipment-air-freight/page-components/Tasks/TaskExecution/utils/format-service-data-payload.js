const numberKeys = ['bls_count', 'volume', 'weight', 'packages_count'];
const DEFAULT_KEY_VALUE = 1;
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
	primaryService,
) => {
	const PAYLOAD_OBJ = {};
	(dataToSend || []).forEach((sendKeyObj) => {
		if (sendKeyObj?.source === 'taskData') {
			PAYLOAD_OBJ[sendKeyObj?.key] = taskData?.[sendKeyObj?.key_from_source];
		}

		if (sendKeyObj?.source === 'serviceData') {
			PAYLOAD_OBJ[sendKeyObj?.key] = taskData?.service_type
				? serviceIdMapping?.[`${taskData?.service_type}.id`]
				: serviceIdMapping?.[`${taskData?.shipment_type}_service.id`];

			if (taskData?.service_type === null) PAYLOAD_OBJ[sendKeyObj?.key] = [primaryService?.id];
		}

		if (sendKeyObj?.source === 'formData') {
			if (numberKeys.includes(sendKeyObj?.key)) {
				PAYLOAD_OBJ[sendKeyObj?.key] = Number(rawValues?.[sendKeyObj?.key_from_source] || DEFAULT_KEY_VALUE);
			} else {
				PAYLOAD_OBJ[sendKeyObj?.key] = rawValues?.[sendKeyObj?.key_from_source];
			}
		}
	});

	const extraParams = extraParamsToMerge(rawValues);

	const finalPayloadObj = { ...PAYLOAD_OBJ, ...extraParams };

	return finalPayloadObj;
};

export default formatDataForService;
