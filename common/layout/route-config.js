import businessConfig from './config/business-finance';
import contracts from './config/contracts';
import homeConfig from './config/home';
import localConfig from './config/locations';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...homeConfig,
	...businessConfig,
	...localConfig,
	...rolesAndPermissions,
	...contracts,
};

export default routeConfig;
