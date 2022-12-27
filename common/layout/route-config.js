import businessConfig from './config/business-finance';
import homeConfig from './config/home';
import coeConfig from './config/coe';
import localConfig from './config/locations';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...homeConfig,
	...businessConfig,
	...coeConfig,
	...localConfig,
	...rolesAndPermissions,
};

export default routeConfig;
