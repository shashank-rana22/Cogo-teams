import businessFinance from './config/business-finance';
import contracts from './config/contracts';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';
import unifiedDashboard from './config/unified-dashboard';

const routeConfig = {
	...rolesAndPermissions,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...unifiedDashboard,
};

export default routeConfig;
