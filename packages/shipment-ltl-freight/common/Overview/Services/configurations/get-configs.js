import ltl_freight from './ltl-freight.json';

const getConfigs = (service_type) => {
	const configs = {
		'ltl-freight'       : ltl_freight,
		ltl_freight_service : ltl_freight,
	};

	return configs[service_type] || ltl_freight;
};
export default getConfigs;
