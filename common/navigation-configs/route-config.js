import allocations from './config/allocations';
import businessFinance from './config/business-finance';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...allocations,
	...businessFinance,
};

export default routeConfig;
