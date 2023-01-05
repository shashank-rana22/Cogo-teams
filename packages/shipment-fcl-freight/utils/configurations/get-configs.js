import allServices from './Services/all-services.json';
import fcl_freight from './Services/fcl-freight.json';

const getConfigs = (service) => {
	const configs = {
		fcl_freight,
		fcl_freight_service: fcl_freight,
	};

	return configs[service] || allServices;
};
export default getConfigs;
