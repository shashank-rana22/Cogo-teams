import businessFinance from './config/business-finance';
import contracts from './config/contracts';
import crmFeedback from './config/crm-feedback';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...rolesAndPermissions,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...crmFeedback,
};

export default routeConfig;
