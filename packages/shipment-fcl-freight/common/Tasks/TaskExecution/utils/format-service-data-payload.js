const numberKeys = ['bls_count', 'volume', 'weight', 'packages_count'];

const extraParamsToMerge = (values) => {
	if (values?.dimension) {
		const { dimension } = values || {};
		let total_volume = 0;

		(dimension || []).forEach((dimensionObj) => {
			total_volume
				+= Number(dimensionObj.length)
				* Number(dimensionObj.breadth)
				* Number(dimensionObj.height);
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
	const payloadObj = {};

	(dataToSend || []).forEach((sendKeyObj) => {
		if (sendKeyObj.source === 'taskData') {
			payloadObj[sendKeyObj.key] = taskData[sendKeyObj.key_from_source];
		}
		if (sendKeyObj.source === 'serviceData') {
			payloadObj[sendKeyObj.key] = taskData.service_type
				? serviceIdMapping[`${taskData.service_type}.id`]
				: serviceIdMapping[`${taskData.shipment_type}_service.id`];
			if (taskData.service_type === null) {
				payloadObj[sendKeyObj.key] = [primaryService?.id];
			}
		}
		if (sendKeyObj.source === 'formData') {
			if (numberKeys.includes(sendKeyObj.key)) {
				payloadObj[sendKeyObj.key] = Number(
					rawValues[sendKeyObj.key_from_source] || 1,
				);
			} else {
				payloadObj[sendKeyObj.key] = rawValues[sendKeyObj.key_from_source];
			}
		}
	});
	const extraParams = extraParamsToMerge(rawValues);
	const finalPayloadObj = { ...payloadObj, ...extraParams };
	return finalPayloadObj;
};

export default formatDataForService;
