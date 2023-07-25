const getServiceName = (service) => {
	const { trade_type = '', service_type = '' } = service || {};
	return trade_type ? `${trade_type}_${service_type}` : service_type;
};

export default getServiceName;
