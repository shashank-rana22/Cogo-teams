import businessConfig from './config/business-finance';
import homeConfig from './config/home';
import localConfig from './config/locations';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...homeConfig,
	...businessConfig,
	...localConfig,
	...rolesAndPermissions,
	...supplyDashboard,
};

export default routeConfig;
