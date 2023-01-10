import businessFinance from './config/business-finance';
import homeConfig from './config/home';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...homeConfig,
	...rolesAndPermissions,
	...businessFinance,
};

export default routeConfig;
