import { startCase } from '@cogoport/utils';

const getService = (service) => {
	let serviceObj = {};

	serviceObj = {
		key        : `${service.code}_${service.service}_${service.trade_type}`,
		name       : service.service_name,
		trade_type : service.trade_type,
	};
	return serviceObj;
};

const getOptions = (services) => services.map((service) => {
	let tradeType = '';
	if (service?.trade_type === 'export') {
		tradeType = 'Origin';
	} else if (service?.trade_type === 'import') {
		tradeType = 'Destination';
	}
	return ({
		label : `${tradeType} ${startCase(service?.name)}`,
		value : service.key,
	});
});
const getAddedServices = (service_details) => {
	const servicesList = Object.values(service_details || {});

	const servicesArr = [];

	(servicesList || []).forEach((item) => {
		if (item?.service_type === 'subsidiary') { servicesArr.push(getService(item)); }
	});

	const added_services = [...new Set(servicesArr)];

	return getOptions(added_services);
};
export default getAddedServices;
