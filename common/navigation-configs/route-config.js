import locations from './config/location';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...locations,
};

export default routeConfig;
