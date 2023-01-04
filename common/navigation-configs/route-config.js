import coeConfig from './config/coe';
import homeConfig from './config/home';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...homeConfig,
	...coeConfig,
	...rolesAndPermissions,
};

export default routeConfig;
