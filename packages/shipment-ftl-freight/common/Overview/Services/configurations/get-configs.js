import ftl_freight from './ftl-freight.json';

const getConfigs = (service_type) => {
	const configs = {
		'ftl-freight'       : ftl_freight,
		ftl_freight_service : ftl_freight,
	};

	return configs[service_type] || ftl_freight;
};
export default getConfigs;
