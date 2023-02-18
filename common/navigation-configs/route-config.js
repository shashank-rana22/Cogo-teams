import businessFinance from './config/business-finance';
import contracts from './config/contracts';
import incidentManagement from './config/incident-management';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...rolesAndPermissions,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...incidentManagement,
};

export default routeConfig;
