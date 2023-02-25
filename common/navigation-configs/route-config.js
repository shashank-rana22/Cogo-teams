import allocations from './config/allocations';
import businessFinance from './config/business-finance';
import contracts from './config/contracts';
import groundOps from './config/ground-ops';
import myIncident from './config/my-incident';
import myProfile from './config/my-profile';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...rolesAndPermissions,
	...groundOps,
	...allocations,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...myIncident,
	...myProfile,
};

export default routeConfig;
