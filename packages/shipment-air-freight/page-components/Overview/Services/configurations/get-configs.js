import air_customs from './air-customs.json';
import air_freight from './air-freight.json';
import air_freight_local_service from './air-local.json';
import ftl_freight from './ftl-freight.json';
import ltl_freight from './ltl-freight.json';

const getConfigs = (service_type) => {
	const configs = {
		'ftl-freight'       : ftl_freight,
		'air-freight'       : air_freight,
		air_customs,
		'ltl-freight'       : ltl_freight,
		ftl_freight_service : ftl_freight,
		air_freight_service : air_freight,
		air_customs_service : air_customs,
		ltl_freight_service : ltl_freight,
		air_freight_local_service,
	};

	return configs[service_type] || air_freight;
};
export default getConfigs;
