import businessConfig from './config/business-finance';
import coeConfig from './config/coe';
import localConfig from './config/locations';
import rolesAndPermissions from './config/roles-n-permission';
import thingsToDo from './config/things-to-do';

const routeConfig = {
	...businessConfig,
	...coeConfig,
	...localConfig,
	...rolesAndPermissions,
	...thingsToDo,
};

export default routeConfig;
