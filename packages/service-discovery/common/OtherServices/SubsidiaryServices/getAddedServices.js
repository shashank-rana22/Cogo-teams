import { startCase } from '@cogoport/utils';

const getService = (service) => {
	let serviceObj = {};

	serviceObj = {
		key        : `${service.code}_${service.service}_${service.trade_type}`,
		name       : service.service_name,
		trade_type : service.trade_type,
		code       : service.code,
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

	const formattedName = startCase(service?.name);
	const formattedLabel = formattedName.includes(tradeType) ? formattedName : `${tradeType} ${formattedName}`;

	return ({
		label : formattedLabel,
		value : service.key,
		code  : service.code,
	});
});

const getAddedServices = (service_details) => {
	const servicesList = Object.values(service_details || {});

	const SERVICES_ARRAY = [];

	(servicesList || []).forEach((item) => {
		if (item?.service_type === 'subsidiary') { SERVICES_ARRAY.push(getService(item)); }
	});

	const added_services = [...new Set(SERVICES_ARRAY)];

	return getOptions(added_services);
};
export default getAddedServices;
