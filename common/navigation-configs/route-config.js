import businessFinance from './config/business-finance';
import contracts from './config/contracts';
import myIncident from './config/my-incident';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...rolesAndPermissions,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...myIncident,
};

export default routeConfig;
