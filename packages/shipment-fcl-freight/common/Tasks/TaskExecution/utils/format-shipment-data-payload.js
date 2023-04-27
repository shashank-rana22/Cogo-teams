const formatDataForShipment = (dataToSend, rawValues, taskData) => {
	const payloadObj = {};

	(dataToSend || []).forEach((sendKeyObj) => {
		if (sendKeyObj.source === 'taskData') {
			payloadObj[sendKeyObj.key] = taskData[sendKeyObj.key_from_source];
		}
		if (sendKeyObj.source === 'formData') {
			payloadObj[sendKeyObj.key] = rawValues[sendKeyObj.key_from_source];
		}
	});
	return payloadObj;
};

export default formatDataForShipment;
