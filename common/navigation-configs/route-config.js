import allocations from './config/allocations';
import businessFinance from './config/business-finance';
import contracts from './config/contracts';
import feedbackSystem from './config/hr-management';
import myIncident from './config/my-incident';
import myProfile from './config/my-profile';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...rolesAndPermissions,
	...allocations,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...myIncident,
	...myProfile,
	...feedbackSystem,
};

export default routeConfig;
