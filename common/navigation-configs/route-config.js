import businessFinance from './config/business-finance';
import groundOps from './config/ground-ops';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...groundOps,
	...businessFinance,
};

export default routeConfig;
