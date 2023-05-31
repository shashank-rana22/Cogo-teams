import ftl_freight from './ftl-freight.json';
import lcl_customs from './lcl-customs.json';
import lcl_freight from './lcl-freight.json';
import lcl_freight_local_service from './lcl-local.json';
import ltl_freight from './ltl-freight.json';

const getConfigs = (service_type) => {
	const configs = {
		'ftl-freight'       : ftl_freight,
		'lcl-freight'       : lcl_freight,
		'lcl-customs'       : lcl_customs,
		'ltl-freight'       : ltl_freight,
		ftl_freight_service : ftl_freight,
		lcl_freight_service : lcl_freight,
		lcl_customs_service : lcl_customs,
		ltl_freight_service : ltl_freight,
		lcl_freight_local_service,
	};

	return configs[service_type] || lcl_freight;
};
export default getConfigs;
