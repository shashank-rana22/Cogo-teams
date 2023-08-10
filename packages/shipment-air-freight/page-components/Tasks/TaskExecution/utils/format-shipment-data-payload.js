const formatDataForShipment = (dataToSend, rawValues, taskData) => {
	const PAYLOAD_OBJ = {};
	(dataToSend || [])?.forEach((sendKeyObj) => {
		if (sendKeyObj?.source === 'taskData') {
			PAYLOAD_OBJ[sendKeyObj?.key] = taskData?.[sendKeyObj?.key_from_source];
		}

		if (sendKeyObj?.source === 'formData') {
			PAYLOAD_OBJ[sendKeyObj?.key] = rawValues?.[sendKeyObj?.key_from_source];
		}
	});

	return PAYLOAD_OBJ;
};

export default formatDataForShipment;
