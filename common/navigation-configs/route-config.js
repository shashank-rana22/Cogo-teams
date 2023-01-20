import businessFinance from './config/business-finance';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...businessFinance,
};

export default routeConfig;
