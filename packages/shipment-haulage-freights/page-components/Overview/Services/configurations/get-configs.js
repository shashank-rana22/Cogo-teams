import haulage_freight from './haulage-freight.json';

const getConfigs = (service_type) => {
	const configs = {
		'haulage-freight'       : haulage_freight,
		haulage_freight_service : haulage_freight,
	};

	return configs[service_type] || haulage_freight;
};
export default getConfigs;
