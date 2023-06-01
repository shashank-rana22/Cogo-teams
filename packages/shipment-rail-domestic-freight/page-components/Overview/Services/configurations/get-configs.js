import ftl_freight from './ftl-freight.json';
import lcl_freight from './lcl-freight.json';
import ltl_freight from './ltl-freight.json';
import rail_freight from './rail-domestic-freight.json';
import trailer_freight from './trailer-freight.json';

const getConfigs = (service_type) => {
	const configs = {
		'ftl-freight'                 : ftl_freight,
		'ltl-freight'                 : ltl_freight,
		'rail-domestic-freight'       : rail_freight,
		'trailer-freight'             : trailer_freight,
		ftl_freight_service           : ftl_freight,
		rail_domestic_freight_service : rail_freight,
		ltl_freight_service           : ltl_freight,
		trailer_freight_service       : trailer_freight,
	};

	return configs[service_type] || lcl_freight;
};
export default getConfigs;
