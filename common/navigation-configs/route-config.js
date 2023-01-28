import allocations from './config/allocations';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...allocations,
};

export default routeConfig;
