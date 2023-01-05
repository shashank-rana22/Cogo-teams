import coeConfig from './config/coe';
import contracts from './config/contracts';
import homeConfig from './config/home';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...homeConfig,
	...coeConfig,
	...rolesAndPermissions,
	...supplyDashboard,
	...contracts,
};

export default routeConfig;
