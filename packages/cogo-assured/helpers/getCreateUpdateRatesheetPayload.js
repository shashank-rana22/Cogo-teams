const getCreateUpdateRatesheetPayload = ({ values = {} }) => {
	const payload = {
		comment      : values?.comment,
		file_url     : values?.file_url,
		service_name : values?.service_name,

	};
	return payload;
};

export default getCreateUpdateRatesheetPayload;
