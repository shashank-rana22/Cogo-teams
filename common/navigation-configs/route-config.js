import businessFinance from './config/business-finance';
import contracts from './config/contracts';
import groundOps from './config/ground-ops';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...rolesAndPermissions,
	...groundOps,
	...supplyDashboard,
	...contracts,
	...businessFinance,
};

export default routeConfig;
