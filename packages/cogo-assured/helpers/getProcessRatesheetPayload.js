const getProcessRatesheetPayload = ({ values = {} }) => {
	const payload = {
		id: values?.id,
	};
	return payload;
};

export default getProcessRatesheetPayload;
