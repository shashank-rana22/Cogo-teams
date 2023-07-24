import fcl_customs from './fcl-customs.json';

const getConfigs = (service_type) => {
	const configs = {
		fcl_customs_service: fcl_customs,
	};

	return configs[service_type] || fcl_customs;
};
export default getConfigs;
