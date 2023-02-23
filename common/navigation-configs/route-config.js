import allocations from './config/allocations';
import businessFinance from './config/business-finance';
import contracts from './config/contracts';
import myIncident from './config/my-incident';
import myProfile from './config/my-profile';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';
import vendorRM from './config/vendor-rm';

const routeConfig = {
	...rolesAndPermissions,
	...allocations,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...vendorRM,
	...myIncident,
	...myProfile,
};

export default routeConfig;
