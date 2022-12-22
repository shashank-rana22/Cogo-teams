import fcl_freight from './Services/fcl-freight.json';
import lcl_freight from './Services/lcl-freight.json';
import allServices from './Services/all-services.json';
const getConfigs = (service) => {
	const configs = {
		fcl_freight,
		lcl_freight,
		fcl_freight_service: fcl_freight,
		lcl_freight_service: lcl_freight,
	};

	return configs[service] || allServices;
};
export default getConfigs;