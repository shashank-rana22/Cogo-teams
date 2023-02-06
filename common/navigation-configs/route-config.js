import groundOps from './config/ground-ops';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...groundOps,
};

export default routeConfig;
