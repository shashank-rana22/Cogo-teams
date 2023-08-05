const formatDataForCargoDetail = ({ dataToSend, rawValues }) => {
	const PAYLOAD = {};

	(dataToSend?.cargo_detail || []).forEach((obj) => {
		if (obj?.source === 'formData') {
			PAYLOAD[obj.key] = rawValues[obj.key_from_source];
		}
	});

	return PAYLOAD;
};

export default formatDataForCargoDetail;
